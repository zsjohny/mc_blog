title: "在saltstack的pillar中使用布尔值"
date: 2015-03-16 12:05:33
tags:
  - saltstack
  - pillar
  - boolean
categories: saltstack

---

###前言
  当我们在构建 pillar 数据结构的时候，如果我们想要使用一个布尔值（开关）时，下面几点是我们需要注意的：

1. PyYAML 会加载 true / false / yes / no / on / off 作为布尔值的`True`或`False`。
2. 如果我们不想使用上面的字符串作为布尔值，需要讲它们用 *引号* 引起来。 例: 'true'.

###实践：

1.  使用布尔，字符串不加引号

```
$ cat pillar.sls
This_is_boolean: yes
$ cat state.sls
{% if pillar['This_is_boolean'] %}
...
{% endif %}
```

2.  不使用布尔，字符串加引号

```
$ cat pillar.sls
This_is_boolean: 'no'
$ cat state.sls
{% if pillar['This_is_boolean'] == 'no' %}
...
{% endif %}
```

###参考:

> PyYAML will load these values as boolean True or False. Un-capitalized versions will also be loaded as booleans (true, false, yes, no, on, and off). 
This can be especially problematic when constructing Pillar data. 
Make sure that your Pillars which need to use the string versions of these values are enclosed in quotes.

[官方说明](http://docs.saltstack.com/en/latest/topics/troubleshooting/yaml_idiosyncrasies.html#true-false-yes-no-on-off)