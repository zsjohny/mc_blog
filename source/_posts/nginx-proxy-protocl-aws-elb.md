title: AWS ELB enable Proxy Protocol with Nginx
date: 2016-01-08 16:26:41
tags:
  - aws
  - elb
  - nginx
  - proxy protocol
categories: aws
---

**故事背景：**

在做迁移前端 Varnish 到 AWS ELB 的测试阶段，因为 ELB 不支持会话层协议（SPDY），所以在 ELB 的 Listener 上把 HTTPS 协议修改为了 TCP 协议， 由此导致后端应用无法获取客户端的真实IP地址，为进一步解决该问题，调查后确认 ELB 激活代理协议可以满足需求，本文将详细说明实现过程。

**环境背景：**

前端一个 AWS ELB 实例，负载两台 varnish 实例，varnish 的后端是 APP 服务池。
varnish 实例上另有 nginx 服务激活 https（启用了SPDY） 负责转发请求给 varnish。

PS: nginx 1.9.x 版本之后不再支持 SPDY，nginx 1.5.12 版本之后支持 proxy_protocol.

<!--more-->

## ELB configuration for proxy protocol

需要安装并配置 [AWS CLI 工具](http://aws.amazon.com/cli/)

查询当前 elb 应用的策略和状态

    $ aws elb describe-load-balancers --load-balancer-name <NAME of ELB>

如果不知道 elb 实例的名字也可以使用下面的命令列出所有的实例和他们的策略。

    $ aws elb describe-load-balancers

接下来需要创建策略给对应的 elb 实例。

### Create the Policy


    $ aws elb create-load-balancer-policy --load-balancer-name <NAME of ELB> --policy-name EnableProxyProtocol --policy-type-name ProxyProtocolPolicyType --policy-attributes AttributeName=ProxyProtocol,AttributeValue=True

这个命令创建了名为 `EnableProxyProtocol` 的策略和 `AttributeName=ProxyProtocol & AttributeValue=True` 属性

接下来需要应用这个策略到指定的 elb 实例上。

### Apply the Policy

    $ aws elb set-load-balancer-policies-for-backend-server --load-balancer-name <NAME of ELB> --instance-port 80 --policy-names EnableProxyProtocol

这个命令在指定的elb上激活了在上一步创建的策略。

* `--instance-port 80` 表示在elb`后端的ec2实例`上的80个端口是激活该策略
* `--policy-names` 该选项表示要应用的策略，注意：若之前有其他策略在该端口上有启用，也需要同时指明

备注：如果有需要取消策略的时候可以使用下面的命令取消

    aws elb set-load-balancer-policies-for-backend-server --load-balancer-name <NAME of ELB> --instance-port 80 --policy-names "[]"

## Nginx configuration for proxy protocol

### Add the new log format in the http section

    http {
        ...
        log_format elb_log '$proxy_protocol_addr - $remote_user [$time_local] '
                            '"$request" $status $body_bytes_sent '
                            '"$http_referer" "$http_user_agent"';
    }

### Append the proxy_protocol on the listen directive

    server {
        listen 80   proxy_protocol;
        listen 443  ssl proxy_protocol;
        ...
    }


### Add the set_real_ip_from directive

    server {
        ...
        set_real_ip_from 192.168.1.0/24;
        ...
    }

指定 负载均衡器或前端 TCP 代理的 IP 地址或范围，即为从哪个IP或范围获取真正的客户端IP地址。

### Add the real_ip_header directive

    server {
        ...
        real_ip_header proxy_protocol;
    }

### Pass the client IP address from NGINX to upstream server

    proxy_set_header X-Real-IP       $proxy_protocol_addr;
    proxy_set_header X-Forwarded-For $proxy_protocol_addr;

转发客户端的真实IP到指定的 header 中。

### Specified the access_log format

    access_log /var/log/nginx/access.log elb_log;

在实现上述过程中，填过的坑：

1. 需要注意在 nginx 的配置中 listen 语句上启用了 `proxy_protocol` 之后，所有到该虚拟主机上的 http 请求将会不再可用。

   > 在调试中通过 curl 命令会提示 `curl: (52) Empty reply from server`, nginx 日志会提示 broken header 的报错，所以如果之前的elb 实例健康检查的方式是 http 或 https 的，需要修改给 tcp.

2. 如果在配置完成后，直接请求后端 nginx 虚拟主机，返回 `400 bad request`，要注意默认虚拟主机或其他虚拟主机的相互影响和检查是否修改了access log 的格式。


参考：
http://docs.aws.amazon.com/cli/latest/reference/
http://docs.aws.amazon.com/zh_cn/ElasticLoadBalancing/latest/DeveloperGuide/enable-proxy-protocol.html
https://www.nginx.com/resources/admin-guide/proxy-protocol/
https://gist.github.com/pablitoc/91c40d820f207879969c
https://chrislea.com/2014/03/20/using-proxy-protocol-nginx/
https://forums.aws.amazon.com/thread.jspa?messageID=592631#592631
