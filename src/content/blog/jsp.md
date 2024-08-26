---
title: jsp
description: 黑马jsp
pubDate: 07 18 2024
image: https://saroprock.oss-cn-hangzhou.aliyuncs.com/img/diary-968592_1280.jpg
categories:
  - study
tags:
  - jsp
  - Blog
---

> 概念：Java Server Pages，Java 服务器页面
> 一种动态的网页技术，其中即可以定义HTML、JS、CSS等静态内容，还可以定义Java代码的动态内容
> JSP=HTML+Java

## JSP 快速入门

1. 导入坐标
```java
 <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
```
3. 建立文件
4. 写代码
```java
    //html 代码
    <h1>你好,Hello World</h1>
    //java 代码（脚本）
    <%
        System.out.println("你好,jsp~");
    %>
```

## JSP 原理

==JSP本质就是一个Servlet==
JSP 在被访问时，由JSP 容器（Tomcat服务器）将其==转换为一个 Java文件（Servlet）==，再由JSP 容器将其编译，最终对外提供服务的就是这个字节码文件
·![](assets/JSP/file-20240809103014399.png)
## JSP 脚本
### 分类
1. <% ... %> ：内容会直接放到_jspService()方法之中

2. <%= .. %>：内容会直接放到out.print()中，作为out.pirint() 参数 ==wite写html标签==
![](assets/JSP/file-20240809103816256.png)


3. <%! ... %>：内容会直接放到_jspService()方法之外 ，被类直接包含  ==成员变量、成员方法==
![](assets/JSP/file-20240809104013580.png)

### JSP 缺点
- 由于 JSP页面内，既可以定义 HTML标签 ，又可以定义 Java代码，造成了以下问题：
1. 书写麻烦：特别是复杂的页面（需要==截断==）
2. 阅读麻烦
3. 复杂度高：运行需要依赖于各种环境，JRE，JSP容器，JavaEE...
4. 占内存和磁盘：JSP会自动生成 .java 和 .class 文件占磁盘，运行的是.class 文件占内存
5. 调试困难：出错后，需要找到自动生成的.java 文件进行高度
6. 不利于团队协作 ：前端人员不会 java ，后端人员不精HTML
7. ... 
![](assets/JSP/file-20240809142751553.png)
- EL 表达式获取替换表达式数据的代码
- JSTL 标签替换循环遍历的代码 

## EL 表达式

>Expression Language 表达式语言，用于简化 JSP页面内的 java代码

#### 主要功能
==获取数据==

#### 语法
${ expression }
`${brands}`： 获取域中存在的==key 为brands ==的数据

#### javaWeb 中的四大域对象
1. page：当前==页面==有效
2. reuqest：当前==请求范围==有效
3. session：当前==会话范围==有效
4. application：当前==应用范围==有效

==el 表达式获取数据，会依次从这4个域中依次寻找，直接找到为止==

![](assets/JSP/file-20240809145220787.png)
## JSTL 标签
>JSP 标准标签库（Jsp Standard Tag Library），使用标签取代JSP页面上的java代码
#### JSTL快速入门
1. 导入坐标
```java
<!--    引入标签库-->
    <dependency>
      <groupId>jstl</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>

    <dependency>
      <groupId>taglibs</groupId>
      <artifactId>standard</artifactId>
      <version>1.1.2</version>
      <scope>provided</scope>
    </dependency>
```
2. 在JSP 页面上引入JSTL 标签库
`<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>`
3. 使用JSTL
#### if 诗句
语法：`<c:if test="el表达式">     </c:if>`
test：为==判断语句==
```java

<%@ page isELIgnored="false" %> 
//一定要加这句话
<c:if test="${status==1}">
    启用
</c:if>

<c:if test="${status==0}">
    禁用
</c:if>
```
#### for循环语句

##### 迭代for循环语句
语法：`<c:forEach items="${brands}" var="i" "    </c:forEach> `
- items：被遍历的容器  =="" 内中不能有多余的空格 如："${brands}   "，否则会出现500==
- var：遍历产生的临时变量
- varStatus：遍历状态对象( index：索引编号  count：顺序编号)
```java
<%@ page isELIgnored="false" %> 

<c:forEach items="${brands} var="i" varStatus="index">
 <tr>
<%--        <td>${brand.id}</td>--%>
            <td>${status.count}</td>
            <td>${brand.brandName}</td>
            <td>${brand.companyName}</td>
            <td>${brand.ordered}</td>
            <td>${brand.description}</td>
            <c:if test="${brand.status==1}">
                <td>启用</td>
            </c:if >

            <c:if test="${brand.status==0}">
                <td>禁用</td>
            </c:if>
            <td><a href="#">修改</a> <a href="#">删除</a></td>
        </tr>
</c:forEaach>
```
![](assets/JSP/file-20240809165002316.png)
##### 普通for 循环语句
语法：`<c:forEach begin="number" end="number"  step = "number" var="O">    </c:forEach>  `
- begin：开始数
- end：结束数
- step：步长
- var：临时变量
```java
<c:forEach begin="0" end="10" step="1" var="i">
	${i}
</c:forEach>
```
![](assets/JSP/file-20240809164946600.png)
## MVC 模式和三层架构 
#### MVC模式
>MVC 是一种==分层== 开发的模式
- M：Model，业务模型，处理业务
- V：View，视图，界面展示
- C：Controller，控制器，处理请求，调用模型和视图
![](assets/JSP/file-20240809170455464.png)
好处：
- 职责单一，互不影响
- 有利于分工协作 
- 有利于组件重用

#### 三层架构
- 数据访问层：对数据库的==CRUD== 的基本操作
- 业务逻辑层：对业务逻辑进行封闭，组合数据访问层层中基本功能，形成复杂的业务逻辑功能（如：登录与注册）
- 表现层：==接收请求==，封闭数据，调用业务逻辑层，==响应数据==
## 案例