title: "uwsgi-listen-socket-queue"
date: 2015-05-07 14:18:20
tags:
---

Thu May  7 12:31:46 2015 - *** uWSGI listen queue of socket "127.0.0.1:56644" (fd: 4) full !!! (101/100) ***

http://uwsgi-docs.readthedocs.org/en/latest/articles/TheArtOfGracefulReloading.html#the-listen-queue

如果没有设置uwsgi的--listen，如果sysctl -a | grep net.core.somaxconn发现net.core.somaxconn=128。

那你使用uwsgi启动的服务，单机最大支持并发数为100*(启动的uwsgi进程数)。

如果启动进程为4个，则最大并发只能支持400，这样会在uwsgi的log日志中出现错误uWSGI listen queue of socket 4 full。

同时，nginx对应也会出现错误***** upstream time out。

 

修补措施：

1.修改系统参数

vim /etc/sysctl.conf
在文件最后添加一行记录net.core.somaxcon = 1024

 执行sysctl -p重新load参数设置，这样会立即生效，并且以后重新启动机器也会生效。

2.设置uwsgi启动的--listen 1024.

这样 你的机器并发数就可以得到一个很大的提升。