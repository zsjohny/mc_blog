title: hexo 跳转 114
tags:
  - hexo
  - ''
categories:
  - 踩过的坑
date: 2016-06-30 13:40:00
---
http://144.dragonparking.com/?

看样子是你的hexo站点地址没配置正确，在hexo的_config.yml里面找到这个代码：

```
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'

url: http://yoursite.com
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
yoursite.com要换成你的博客地址。
```

https://github.com/xiangming/landscape-plus/issues/82