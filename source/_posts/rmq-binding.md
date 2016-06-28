title: rmq_binding
date: 2015-09-19 17:23:24
tags:
---

Bindings

http://www.rabbitmq.com/tutorials/tutorial-three-python.html
We've already created a fanout exchange and a queue. Now we need to tell the exchange to send messages to our queue. That relationship between exchange and a queue is called a binding.

channel.queue_bind(exchange='logs',
                   queue=result.method.queue)
From now on the logs exchange will append messages to our queue.

Listing bindings

You can list existing bindings using, you guessed it, rabbitmqctl list_bindings.
