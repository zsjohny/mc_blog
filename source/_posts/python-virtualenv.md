title: python-virtualenv
date: 2015-03-05 15:40:54
tags:
  - virtualenv
  - python
categories: python
---


##virtualenv
virtualenv 官方的描述:
> virtualenv 是一个创建隔离的Python环境的工具。
virtualenv要解决的根本问题是库的版本和依赖，以及权限问题。假设你有一个程序，需要LibFoo的版本1，而另一个程序需要版本2，如何同时使用两个应用程序呢？如果将所有的库都安装在 /usr/lib/python2.7/site-packages（或者你的系统的标准包安装路径），非常容易出现将不该升级的库升级的问题。
另外，在一台共享的机器上，如果没有全局的 site-packages 目录的权限（例如一个共享的主机），如何安装Python库呢？
在这些情况下，就是该用到virtualenv的地方。它能够创建一个自己的安装目录，形成一个独立的环境，不会影响其他的virtualenv环境，甚至可以不受全局的site-packages当中安装的包的影响。

总结如下：

1. 能够创建多个独立的Python环境，互不影响
2. 在没有权限的情况下安装新套件
3. 不同应用可以使用不同的套件版本
4. 套件升级不影响其他应用

####安装
```shell
$ sudo apt-get install python-virtualenv
```

####创建
```shell
$ virtualenv &lt;virtualenv name>
```

例如
```shell
$ virtualenv **myvirtualenv**
```

默认情况下，虚拟环境会依赖系统环境中的site packages，就是说系统中已经安装好的第三方package也会安装在虚拟环境中，如果不想依赖这些package，那么可以加上参数 --no-site-packages建立虚拟环境

```shell
$ virtualenv --no-site-packages &lt;virtualenv name> ```

####启动
```shell
$ source myvirtualenv/bin/activate
(myvirtualenv)$
```
注意此时命令行提示符前面会多一个(myvirtualenv)，为虚拟环境名称，接下来所有模块都只会安装到该目录中去。

####退出
```shell
(myvirtualenv)$ deactivate
```

####安装Python套件
Virtualenv 附带有pip安装工具，因此需要安装的套件可以直接运行：

```shell
$ pip install &lt;name>
```

####清除安装的套件(工作环境)
```shell
$ virtualenv --clear &lt;virtualenvname>
```

##Virtualenvwrapper
Virtaulenvwrapper是virtualenv的扩展包，用于更方便管理虚拟环境，它可以做：
1. 将所有虚拟环境整合在一个目录下
2. 管理（新增，删除，复制）虚拟环境
3. 切换虚拟环境
4. ...

####安装
```shell
$ sudo pip install virtualenvwrapper
```
默认 virtualenvwrapper 安装在 /usr/local/bin 目录下，实际上需要加载 virtualenvwrapper.sh 文件才行，可以打开这个文件,看到有安装步骤。
> Setup:
>
>  1. Create a directory to hold the virtual environments. (mkdir $HOME/.virtualenvs).
>  2. Add a line like "export WORKON_HOME=$HOME/.virtualenvs" to your .bashrc.
>  3. Add a line like "source /path/to/this/file/virtualenvwrapper.sh" to your .bashrc.
>  4. Run: source ~/.bashrc
>  5. Run: workon
>  6. A list of environments, empty, is printed.
>  7. Run: mkvirtualenv temp
>  8. Run: workon
>  9. This time, the "temp" environment is included.
> 10. Run: workon temp
> 11. The virtual environment is activated.

####创建目录存放虚拟环境

```shell
$ mkdir $HOME/.virtualenvs
```

####在~/.bashrc中添加行：
	export WORKON_HOME=$HOME/.virtualenvs

####在~/.bashrc中添加行：
	source /usr/local/bin/virtualenvwrapper.sh

##运行
```shell
$ source ~/.bashrc
```

此时virtualenvwrapper就可以使用了。

---

列出虚拟环境

```shell
$ workon
```
或
```shell
$ lsvirtualenv
```

新建虚拟环境

```shell
$ mkvirtualenv <virtualenvname>
```

启动/切换虚拟环境

```shell
$ workon <virtualenvname>
```

删除虚拟环境

```shell
$ rmvirtualenv <virtualenvname>
```

离开虚拟环境

```shell
$ deactivate <virtualenvname>
```

参考：
http://www.virtualenv.org/en/latest/
http://stackoverflow.com/questions/11372221/virtualenvwrapper-not-found
http://www.openfoundry.org/tw/tech-column/8516-pythons-virtual-environment-and-multi-version-programming-tools-virtualenv-and-pythonbrew
http://virtualenvwrapper.readthedocs.org/en/latest/index.html