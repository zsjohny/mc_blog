title: zabbix 触发器的表达式语法和总结
date: 2015-03-11 14:15:01
tags:
  - zabbix
  - trigger
  - monitor
categories: zabbix

---

## Overview

trigger的表达式非常灵活，简单地语法结构如下所示

	{<server>:<key>.<function>(<parameter>)}<operator><constant>

## 说明
1. server:

   > 指 trigger 所在的主机名称（ 一般为模板名称 ）<!--more-->

2. key:

    > 指监控的 item 的 key

3. function

    > [trigger 支持的完整的 function 列表](1)

4. function parameters

   > 大部分 functions 支持用秒数作为参数，也可以在参数前 加一个 `#` 号做特殊处理.

| FUNCTION 调用 | 含义 |
|----------|---------------------|
| sum(600) | 600 秒内所有的值的总数 |
| sum(#5)  | 最后的5个值           |


`#` 号在 function `last` 中则表示其他的含义，是指当前值之前的 `第` 几个值。
> 例如获取的值有 3，7，2，6，5（从左到右按照时间排序）**last(#2)** 返回的值是6，**last(#5)** 返回的值是 7.

function 至少需要一个参数，`0` 表示忽略它。

avg, count, last, min 和 max 函数支持一个可选的`time_shift` 参数，可以表示一个过去的一个时间点。
> 例如： avg(1h, 1d) 会返回一个小时前的一天前的平均数。
> 假设当前时间是 10 点，上面的参数会返回昨天9点到今天9点得平均值。

在trigger 的表达式中也可以使用 [单位符号](2).
> 例如： '5m'(分钟) 替换 '300' 秒，'1d'(天) 替换 '86400' 秒

###5. Operators
> 操作符的执行按照优先级顺序执行。


| 优先级 | 操作符 | 定义 |
|--------|--------|---|
|1|/|Division|
|2|*|Multiplication|
|3|-|Arithmetical minus|
|4|+|Arithmetical plus|
|5|>|Less than. The operator is defined as: A<B ⇔ (A<=B-0.000001)|
|6|<|More than. The operator is defined as: A>B ⇔ (A>=B+0.000001)|
|7|#|Not equal. The operator is defined as: A#B ⇔ (A<=B-0.000001) or (A>=B+0.000001)|
|8|=|Is equal. The operator is defined as: A=B ⇔ (A>B-0.000001) & (A<B+0.000001)|
|9|&|Logical AND|
|10||Logical OR|


### Trigger 的例子

* 进程负载
```
{www.zabbix.com:system.cpu.load[all,avg1].last(0)}>5
```

*  网站过载
```
{www.zabbix.com:system.cpu.load[all,avg1].last(0)}>5{www.zabbix.com:system.cpu.load[all,avg1].min(10m)}>2
```

* /etc/passwd 被更改
```
{www.zabbix.com:vfs.file.cksum[/etc/passwd].diff(0)}>0
```

* 主机不可达
```
{zabbix.zabbix.com:icmpping.count(30m,0)}>5
```

* 检查客户端时间是否同步
```
{server:system.cpu.load.avg(1h)}/{server:system.cpu.load.avg(1h,1d)}>2
```

## 参考
[https://www.zabbix.com/documentation/2.0/manual/config/triggers/expression]()
[https://www.zabbix.com/documentation/2.0/manual/appendix/triggers/functions]()

[1]:  <https://www.zabbix.com/documentation/2.0/manual/appendix/triggers/functions>
[2]:  <https://www.zabbix.com/documentation/2.0/manual/config/triggers/suffixes>