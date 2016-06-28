title: "building-jenkins-manually"
date: 2015-04-20 11:40:04
tags:
---

手动编译 Jenkins 插件


$ git clone https://github.com/sitespeedio/jenkins.sitespeed.io.git

$ cd jenkins.sitespeed.io

> Building a Plugin
> To build a plugin, run mvn install. This will create the file ./target/pluginname.hpi that you can deploy to Jenkins.

$ mvn install

可以使用 -X 选项打开debug 模式，以方便在有error输出的时候进行调试。

$ cp sitespeed.hpi $JENKINS_HOME/plugin/

Deploying a custom build of a core plugin
Stop Jenkins
Copy the custom HPI file to $JENKINS_HOME/plugins
Remove the previously expanded plugin directory
Create an empty file called <plugin>.hpi.pinned - e.g. maven-plugin.hpi.pinned
Start Jenkins


参考：

https://wiki.jenkins-ci.org/display/JENKINS/Plugin+tutorial