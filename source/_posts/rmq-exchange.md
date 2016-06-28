title: RabbitMQ Exchange
date: 2015-09-19 17:23:15
tags:
  - rabbitmq
  - exchange
categories: rabbitmq
---

### Exchange 的定义

![exchange](http://www.rabbitmq.com/img/tutorials/exchanges.png)

The core idea in the messaging model in RabbitMQ is that the producer never sends any messages directly to a queue. Actually, quite often the producer doesn't even know if a message will be delivered to any queue at all.

在RabbitMQ的管理模块中核心的概念是生产者从来不直接发送消息到一个队列中。实际上，通常来讲，生产者根本不知道消息是否会发送到任何的队列中。

Instead, the producer can only send messages to an exchange. An exchange is a very simple thing. On one side it receives messages from producers and the other side it pushes them to queues. The exchange must know exactly what to do with a message it receives. Should it be appended to a particular queue? Should it be appended to many queues? Or should it get discarded. The rules for that are defined by the exchange type.

相反地，生产者只能发送消息给一个exchange, 一个exchange是一个很简单的东西，它一边从生产者那里接受消息，一边把消息推送到队列中。所以Exchange必须清楚知道它应该如何处理接收到的消息。

<!--more-->

### Exchange 的分类

* direct

* topic

* headers

* fanout

![fanout](http://www.rabbitmq.com/img/tutorials/bindings.png)

Let's create an exchange of that type, and call it logs:

```python
channel.exchange_declare(exchange='logs',
                         type='fanout')
```
.
The fanout exchange is very simple. As you can probably guess from the name, it just broadcasts all the messages it receives to all the queues it knows. And that's exactly what we need for our logger.
fanout exchange 非常简单，就跟它的名字一样，就是把接收到的消息广播到所有它知道（binding的）的队列中。




