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
```javaScript
//html 代码
<h1>你好,Hello World</h1>
//java 代码（脚本）
<%
    System.out.println("你好,jsp~");
%>
```