title: Maven Best Practice
date: 2016-07-13 17:17:41
tags:
---
# Maven Best Practice


----------


## Maven资源

 


----------


**见官方网站；**

The 5 minute test，官方简易入门文档；

Getting Started Tutorial，官方入门文档；

Build Cookbook，官方的cookbook；

POM Reference，POM文件的设置参考

Settings Reference ，settings文件的设置参考

Better Builds with Maven，免费的电子书，下载需要注册。

 

## Maven和Ant的区别


----------


 

Maven正在逐渐取代Ant，很多java开源软件（Spring、Struts2 ……）已经使用maven。

不需要写复杂的处理脚本；
声明式的类库依赖管理。
 

## Maven的基本功能

 


----------


构建：比如生成class、jar、war或者ear文件

生成文档：比如生成javadoc、网站文档

生成报告：比如junit测试报告

生成依赖类库：生成文档，说明项目多其他软件的依赖

有关SCM：SCM（Software Configuration Management），软件配置管理，比如版本控制，比如bug管理等等

发布：生成供发布的分发包，比如生成Struts2的分发包，供提交给用户使用

部署：比如，web应用程序，自动部署到指定的服务器上

## Maven常用命令：


----------


### 1. 创建Maven的普通java项目：
	   mvn archetype:create
	   -DgroupId=packageName
	   -DartifactId=projectName 
### 2. 创建Maven的Web项目：  
    mvn archetype:create
    -DgroupId=packageName   
    -DartifactId=webappName
    -DarchetypeArtifactId=maven-archetype-webapp   
### 3. 编译源代码： 
	mvn compile
### 4. 编译测试代码：
	mvn test-compile   
### 5. 运行测试：
	mvn test  
### 6. 产生site：
	mvn site  
### 7. 打包：
	mvn package  
### 8. 在本地Repository中安装jar：
	mvn install
### 9. 清除产生的项目：
	mvn clean  
### 10. 生成eclipse项目：
	mvn eclipse:eclipse 
### 11. 生成idea项目：
	mvn idea:idea 
### 12. 组合使用goal命令，如只打包不测试：
	mvn -Dtest package  
### 13. 编译测试的内容：
	mvn test-compile 
### 14. 只打jar包: 
	mvn jar:jar 
### 15. 只测试而不编译，也不测试编译：
	mvn test -skipping compile -skipping test-compile
      ( -skipping 的灵活运用，当然也可以用于其他组合命令) 
### 16. 清除eclipse的一些系统设置:
	 mvn eclipse:clean 

## pom.xml 文件基本节点介绍


----------


	<project > ：文件的根节点 .
	<modelversion > ： pom.xml 使用的对象模型版本 .
	<groupId > ：创建项目的组织或团体的唯一 Id.
	<artifactId > ：项目的唯一 Id, 可视为项目名 .
	<packaging > ：打包物的扩展名，一般有 JAR,WAR,EAR 等 
	<version > ：产品的版本号 .
	<name > ：项目的显示名，常用于 Maven 生成的文档。 
	<url > ：组织的站点，常用于 Maven 生成的文档。 
	<description > ：项目的描述，常用于 Maven 生成的文档。
 
 
 
**在 POM 4 中， <dependency> 中还引入了 <scope> ，它主要管理依赖的部署。目前 <scope> 可以使用 5 个值：**

	compile ：缺省值，适用于所有阶段，会随着项目一起发布。
	provided ：类似 compile ，期望 JDK 、容器或使用者会提供这个依赖。如 servlet.jar 。
	runtime ：只在运行时使用，如 JDBC 驱动，适用运行和测试阶段。
	test ：只在测试时使用，用于编译和运行测试代码。不会随项目发布。
	         system ：类似 provided ，需要显式提供包含依赖的 jar ， Maven 不会在 Repository 中查找它。

**定义自己的结构**
新建一个 archetype 项目 ：

	mvn archetype:create\ 
	-DgroupId=cn.prof\ 
	-DartifactId=prof-archetype\ 
	-DarchetypeArtifactId=maven-archetype-archetype
	       主要的模板文件 ： archetype-resources/pom.xml
	       修改其中内容
	       修改 META-INF/maven/archetype.xml 中定义了相关的 sources
	       安装此项目 ： mvn install
	 
## 在应用程序用使用多个存储库


----------


	<repositories>   
	    <repository>     
	        <id>Ibiblio</id>     
	        <name>Ibiblio</name>     
	        <url>http://www.ibiblio.org/maven/</url>   
	    </repository>   
	    <repository>     
	        <id>PlanetMirror</id>     
	        <name>Planet Mirror</name>     
	        <url>http://public.planetmirror.com/pub/maven/</url>   
	    </repository> 
	</repositories>


	mvn deploy:deploy-file -DgroupId=com -DartifactId=client -Dversion=0.1.0 -Dpackaging=jar -Dfile=d:\client-0.1.0.jar -DrepositoryId=maven-repository-inner -Durl=ftp://xxxxxxx/opt/maven/repository/


## 发布第三方Jar到本地中：


----------


		mvn install:install-file -DgroupId=com -DartifactId=client -Dversion=0.1.0 -Dpackaging=jar -Dfile=d:\client-0.1.0.jar	       


## 目录说明


----------


### Maven2  Directory 
 
目录 
 二级目录 
 三级目录 
 四级目录 
 说明 


----------


 
    pom.xml 

     Maven2 的项目设置文件 

    src/ 

     源码目录 

    main/ 

     项目主体目录根 

    java/ 

     源代码目录 

    resources/ 

     所需资源目录 

    filters/ 

     资源过滤文件目录 

    assemby/ 

     Assembly descriptors 

    config/ 

     配置文件根目录 

    webapp/ 

     web 应用目录 

    WEB-INF/ 
     WEB-INF 目录 

    test/ 

     项目测试目录根 

    java/ 

     测试代码目录 

    resources/ 

     测试所需资源目录 

    filters/ 

     测试资源过滤文件目录 

    site/ 

     与site 相关的资源目录 

    target/ 

     输出目录根 

    classes/ 


     项目主体输出目录 

    test_classes/ 

     项目测试输出目录 

    site/ 

     项目site 输出目录


## 创建maven项目命令


----------


 

mvn archetype:generate  列出所有可用的模板供选择并创建

mvn dependency:analyze  使用maven Dependency插件进行优化

mvn dependency:resolve  已解决依赖的列表

mvn dependency:tree   项目的整个依赖树

mvn install -X 查看完整的依赖踪迹，包含那些因为冲突或者其它原因而被拒绝引入的构件（慎用，输出信息巨大）

mvn scm:checkin -Dmessage="Message" 提交

mvn scm:checkout 检出 

mvn scm:update 更新 

mvn help:effective-pom 查看项目的有效pom

mvn help:effective-pom > mypom.xml 可以把项目的有效pom放入mypom.xml里面去。以供查看 

mvn help:active-profiles 列出活动的profile

mvn test -Dtest=MyTest  只能src.test.Java下的MyTest类进行测试

mvn test -Dtest=MyTest -DfailIfNoTests=false 如果测试类里没有测试方法不报错

mvn package -Dmavne.test.skip=true 打包之前不执行单元测试

# 生成项目


----------


 

	mvn archetype:create -DgroupId=com.myproject.app -DartifactId=myproject -DpackageName=com.myproject.mavenbook

用archetype插件快速创建一个组名为com.myproject.app artifactId为myproject 项目包目录结构为com/myproject/mavenbook的java项目

 

	mvn archetype:create -DgroupId=com.myproject.app -DartifactId=myproject -DpackageName=com.myproject.mavenbook -DarchetypeArtifactId=maven-archetype-webapp
	
用archetype插件快速创建一个组名为com.myproject.app artifactId为myproject 项目包目录结构为com/myproject/mavenbook的web-app项目


## 基本设置

 

 

### 协作关系

 

 

	<project xmlns="http://maven.apache.org/POM/4.0.0"
	  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
	                      http://maven.apache.org/maven-v4_0_0.xsd">
	  <modelVersion>4.0.0</modelVersion>
	
	  <groupId>org.codehaus.mojo</groupId>
	  <artifactId>my-project</artifactId>
	  <version>1.0</version>
	  <packaging>war</packaging>
	</project>
 

groupId : 组织标识，例如：org.codehaus.mojo，在M2_REPO目录下，将是: org/codehaus/mojo目录。
artifactId : 项目名称，例如：my-project，在M2_REPO目录下，将是：org/codehaus/mojo/my-project目录。
version : 版本号，例如：1.0，在M2_REPO目录下，将是：org/codehaus/mojo/my-project/1.0目录。
packaging : 打包的格式，可以为：pom , jar , maven-plugin , ejb , war , ear , rar , par
 

### POM间关系

 

 
#### 依赖关系

 

依赖关系列表（dependency list）是POM的重要部分。


----------


	  <dependencies>
	    <dependency>
	      <groupId>junit</groupId>
	      <artifactId>junit</artifactId>
	      <version>4.0</version>
	      <scope>test</scope>
	    </dependency>
	    ...
	  </dependencies>
 

groupId , artifactId , version :
scope : compile(default),provided,runtime,test,system
exclusions

#### 如何查到依赖的类库？


----------


一般可以通过这个网站：`http://www.mvnrepository.com`

比如查询hibernate，可以找到结果列表中的hibernate类库条目。

点击：`http://www.mvnrepository.com/artifact/org.hibernate/hibernate，`

选择版本，比如3.2.6ga，即：`http://www.mvnrepository.com/art .../hibernate/3.2.6.ga`

复制文章中的：

 

<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate</artifactId>
    <version>3.2.6.ga</version>
</dependency>
 

到pom.xml文件中即可。

#### 是否还需要找到hibernate依赖的pom？


  不需要，hibernate也会有pom，maven会通过它的pom自动找到它依赖的类库。

 

#### 继承关系

 


----------


继承其他pom.xml配置的内容。

maven提供了一个类似java.lang.Object的顶级父pom.xml文件。

可以通过下面命令查看当前pom.xml受到超pom.xml文件的影响：

 

    mvn help:effective-pom

 

**创建一个各种项目可复用的pom.xml文件：**

    http://easymorse.googlecode.com/svn/trunk/pom/pom.xml

部署要复用的pom.xml文件：

 

    mvn install

 

在自己的pom文件中继承上述pom：

 

        <parent>
                <groupId>com.easymorse</groupId>
                <artifactId>pom</artifactId>
                <version>0.1</version>
        </parent>
 

 

#### 聚合关系

 


----------


用于将多个maven项目聚合为一个大的项目。

比如目录结构如下：

 

.
|-- pom.xml
|-- module-a
    `-- pom.xml
|-- module-b
    `-- pom.xml
|-- module-c
    `-- pom.xml
|-- foo-all
    `-- pom.xml
 

那么总的pom.xml文件类似：

 

    <modules>
        <module>module-a</module>
        <module>module-b</module>
        <module>module-c</module>
        <module>foo-all</module>
    </modules>
</project>
 

参考文档：http://maven.apache.org/plugins/maven-eclipse-plugin/reactor.html


 

### 其他配置

 


----------


maven的属性，是值的占位符，类似EL，类似ant的属性，比如${X}，可用于pom文件任何赋值的位置。

有以下分类：

env.X：操作系统环境变量，比如${env.PATH}
project.x：pom文件中的属性，比如：<project><version>1.0</version></project>，引用方式：${project.version}

settings.x：settings.xml文件中的属性，比如：<settings><offline>false</offline></settings>，引用方式：${settings.offline}

Java System Properties：java.lang.System.getProperties()中的属性，比如java.home，引用方式：${java.home}
自定义：在pom文件中可 以：<properties><installDir>c:/apps/cargo-installs< /installDir></properties>，引用方式：${installDir}

 

## 其他

 


----------


 

### 设置离线

 


----------


在.m2目录下创建settings.xml文件（如果没有的话）

 

		<settings xmlns="http://maven.apache.org/POM/4.0.0"
		        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
		http://maven.apache.org/xsd/settings-1.0.0.xsd">
		        <offline>true</offline>
		</settings>
 

 

### 安装第三方包

 

经常有第三方包，因为一些原因，在网上repository上没有，需要自己动手安装。

比如sun某些版本的jar文件，比如oracle的驱动。

已oracle驱动程序为例，比如驱动路径为c:/driver/ojdbc14.jar，是10.2.0.3.0版本

在该网址能够查到：

    http://www.mvnrepository.com/artifact/com.oracle/ojdbc14 artifactId和groupId。

 

    mvn install:install-file -DgroupId=com.oracle -DartifactId=ojdbc14 -Dversion=10.2.0.3.0 -Dpackaging=jar -Dfile=c:/driver/ojdbc14.jar

 

**这样就可以在pom中依赖引用了：**

 

		<dependency>
		    <groupId>com.oracle</groupId>
		    <artifactId>ojdbc14</artifactId>
		    <version>10.2.0.3.0</version>
		</dependency>
 

 

### 部署到tomcat


----------


 

tomcat配置有管理权限的用户：conf\tomcat-users.xml

 
		
		<?xml version='1.0' encoding='utf-8'?>
		<tomcat-users>
		  <role rolename="manager"/>
		  <user username="marshal" password="password" roles="manager"/>
		</tomcat-users>
 

在pom文件的tomcat插件中添加：

 

                        <plugin>
                                <groupId>org.codehaus.mojo</groupId>
                                <artifactId>tomcat-maven-plugin</artifactId>
                                <configuration>
                                        <url>http://localhost:8080/manager</url>
                                        <server>myserver</server>
                                        <path>/mycontext</path>
                                </configuration>
                        </plugin>
 

在.m2/settings.xml文件中增加：

 

		<settings xmlns="http://maven.apache.org/POM/4.0.0"
		        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
		http://maven.apache.org/xsd/settings-1.0.0.xsd">
		        <servers>
		                <server>
		                        <id>myserver</id>
		                        <username>marshal</username>
		                        <password>password</password>
		                </server>
		        </servers>
		</settings>
 

运行打包部署，在maven项目目录下：
  	
    mvn tomcat:deploy
    
然后访问：http://localhost:8080/mycontext/ 即可。

撤销部署：

	mvn tomcat:undeploy

启动web应用：

	mvn tomcat:start
    
停止web应用：

	mvn tomcat:stop
    
重新部署：

	mvn tomcat:redeploy
        
部署展开的war文件：

	mvn war:exploded tomcat:exploded

### 未讲到的内容


----------


 

settings.xml的配置

pom.xml的详细配置

自定义插件的方法：http://maven.apache.org/plugins/maven-archetype-plugin/examples/archetype.html

自定义goal的执行：<preGoal><postGoal>

插件的查询和使用

搭建镜像repository

在maven中调用ant