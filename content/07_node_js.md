#### 本文涉及的内容
* NodeJs诞生
* npm和常用命令
* NodeJs前端工程化工具
* 前端框架
* NodeJs生态


---

#### NodeJs诞生

NodeJs诞生以前的前端开发基本上就是刀耕火种的开发方式，虽然有代码管理工具，但是开发模式是一个HTML直接引script，好一点的可能使用requireJs等模块化工具。Node诞生以前的JS尚无法涉足后端开发领域。如果你还搞不清后端到底开发些什么东西，你需要自己去搞明白了，这些是最基础的知识。不用深入，但是得知道前后端的界线(不是你把Koa代码运行在你本机，koa就是客户端了)。更深入的会在单独的专题中讲解。

NodeJs的诞生用漫威的说法来说就是一个大事件，并且是N多年才出现一次的大事件。NodeJs出现以后，随着npm工具和工程化工具以及前端开发逐渐复杂，前端开发才算做正式的一个岗位独立出来。

* NodeJs使用npm对依赖进行管理和发布，一些函数和库从网上下载即可，不必从零构建
* NodeJs使用package.json描述项目文件，标准化了项目的目录结构，使得前端项目得以以一个概念上的整体而存在

#### npm和常用命令

* `npm init`:在当前目录下初始化NodeJs项目，创建package.json文件
* `npm install`:根据package.json的描述安装依赖
* `npm install --save-dev`:新添加开发依赖项
* `npm start xxx`:xxx为package.json中scripts属性下的key，执行这条命令相当于执行scripts下的那一行命令

#### NodeJs前端工程化工具

什么是前端工程化?
// TO BE WRITE

* grunt
* gulp
* webpack
* etc...


#### 前端框架

* React
* Vue
* React

#### NodeJs服务端生态
* HttpServer:
* MockServer:
* ProxyServer:
* ORM
