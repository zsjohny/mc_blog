title: rabbitmq management
date: 2015-09-19 15:08:31
tags:
  - rabbitmq
  - celery
categories: rabbitmq
---

#### 队列中消息的几种状态：
![截图rmq webconsole]()
```bash
Finding the number of tasks in a queue:

$ rabbitmqctl list_queues name messages messages_ready  \ messages_unacknowledged
Listing queues ...
aliveness-test	0	0	0
default	0	0	0
emails	0	0	0
...done.
```
* **messages_ready**

下面是从rabbitmq的角度说明的ready的消息状态，已经从队列中已经准备好要分配给consumer了，但是还没有发（队列长度）。

> Number of messages ready to be delivered to clients.

下面是从celery的角度说明的这个消息的状态，celery 将消息发送给了broker但是还没有收到消息的结果(成功发送给了borker)。

Here messages_ready is the number of messages ready for delivery (sent but not received)

* **messages_unacknowledged**

> Number of messages delivered to clients but not yet acknowledged.

messages_unacknowledged is the number of messages that has been received by a worker but not acknowledged yet (meaning it is in progress, or has been reserved).

备注：如果 consumer 指明 ack 的标识为 True ,那 rabbtmq 不会从内存中释放这条消息直到它收到了 ack ,也就是说消息不会丢，会重新 delivery 给其他消费者。
参考：[Message acknowledgment][1]

* **messages**

> Sum of ready and unacknowledged messages (queue depth).

messages is the sum of ready and unacknowledged messages combined.

#### 如何保证消息不会丢失：

1. 消息者响应 ack 给 rabbitmq server
2. 消息和队列的持久性

[1]: <http://www.rabbitmq.com/tutorials/tutorial-two-python.html>
