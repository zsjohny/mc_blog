title: Hexo生成sitemap站点地图的方法
date: 2016-06-28 17:09:21
tags:
---
### 1、安装插件：

npm install hexo-generator-sitemap --save

npm install hexo-generator-baidu-sitemap --save

```
vim package.json
    "hexo-generator-sitemap": "^1.1.2",
    "hexo-generator-baidu-sitemap": "^0.1.2",
```


### 2、在博客目录的_config.yml中添加如下代码：

```
# 自动生成sitemap
sitemap:
    path: sitemap.xml
baidusitemap:
    path: baidusitemap.xml
```

### 3、hexo编译的时候会自动在根目录生成站点地图

