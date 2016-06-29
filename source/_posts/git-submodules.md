title: git 子模块
date: 2016-6-30 03:08:31
tags: git
categories: technology
---

# Git使用submodule命令：

________

## 添加子模块：
```
git submodule add ~/git/libs/lib1.git libs/lib1
```
## git会在项目下生成.gitmodule
```
cat .gitmodule
[submodule "libs/lib1"]
        path = libs/lib1
        url = ~/git/libs/lib1.git
#进入libs/lib1目录
```
```
cd libs/lib1
```
## 操作新的库lib1,看得出是lib1自己的库remote信息。
```
git remote -v
```
## 进入项目根目录，初始化submodule,更新submodule(必须在根目录执行命令)
```
cd ../../
git submodule init
git submodule update
```

[Click Offcial](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)