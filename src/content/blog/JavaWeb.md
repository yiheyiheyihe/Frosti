## Web核心
Web：全球与广域网，也称万维网（www），能够通过浏览器访问的网站
## javaWeb技术栈
B/S架构：Browser/Server，浏览器/服务器 架构模式
- 特点：客户端只需要浏览器，应用程序和逻辑和数据都存储在服务器端。浏览器只需要请求服务器，获取web资源，服务器把web资源发送给浏览器即可
- 好处：易于维护升级：服务器端升级后，客户端无需任何部署就可以使用到新的版本
静态资源：HTML、CSS、JavaScript、图片等。负责页面展现
动态资源：Servlet、JSP等。负责逻辑处理
数据库：负责存储数据
HTTP协议：定义通信规则
Web服务器：负责解析HTTP协议，解析请求数据，并发送响应数据
过程：
![[file-20240731192242243.png]]
用户通过浏览器向服务器发送请求——>由servlet与jsp访问数据库——>拿到数据后给三剑客——>最后把静态页面返回给浏览器

## HTTP
>概念：Hyper Text Transer Protocol，超文本传输协议，规定了浏览器和服务器之间数据传输的规则

特点：
1. 基于TCP(传输控制协议)：面向连接，安全可靠
2. 基于请求-响应模型：一次请求对应一次响应
3. HTTP协议是无状态的协议：对于事务处理没有记忆能力。每次请求-响应都独立的（不会连接前面的数据内容）
	- 缺点：多次请求间不能共享数据。使用会话技术（Cookie、Session）来解决
	- 优点：速度快、安全
###  HTTP-请求数据格式
- 请求数据分为3行
请求行：请求数据的第一行。其中GET表示请求方式，/ 表示请求资源路径/，HTTP/1.1 表示协议版本
请求头：==第二行开始==，格式为key : value的形式
请求体：==只有POST请求方式才有请求体==，它在最后一部分，存放请求参数
- 常见的HTTP请求头：
Host：==表示请求的主机名==
User-Agent：==浏览器版本==
Accept：表示浏览器==能接收的资源类型==，如text/*，image/*或者 `*/*`表示 接收所有
Accept-Language：==语言偏好==，服务器可以据此返回不同语言的网页
Accept-Encoding：可支持的==压缩类型==，例如：gzip, deflate
- GET请求和POST请求区别
1. GET请求的请求参数（==地址栏中的内容==）在请求行中，==没有请求体==
	  POST请求参数==在请求体中==，不在请求行中
  2.GET请求参数大小有限制，POST没有 

**GET请求数据方式**
![[file-20240731200927859.png]]
**POST请求数据方式**
![[file-20240731201002171.png]]
## Web 服务器-Tomcat（Web服务器）

### 介绍
Web 服务器是一个应用软件，对HTTP协议的操作进行封装，使得程序员不必直接对协议进行操作，让Web 更加便捷。主要功能是：提供网上信息浏览服务
### 项目结构
![[file-20240802101116500.png]]
## Servlet
##### 概念
运行在服务器端的小程序，是Java 提供的一门==动态web== 资源开发技术
- servlet 就是一个==接口==，定义了Java类被浏览器访问到（tomact 识别）的规则 
- 将来我们自定义一个类，实现Servlet接口，复写方法

### 快速入门
1. 创建 web项目，==导入Servlet依赖坐标与Tomcat7插件==
```java
 <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
```
3. 定义一个类，==实现 Servlet接口==，并重写接口中所有方法，并在 ==service方法中输入==一句话
```cs
public void ServletDemo1 implements Servlet{ public void srvice(){sout("hello Servlet");}}
```
5. 配置：在类上使用@WebServlet 注解，配置该 Servlet的访问路径
```cs
@WebServlet("/demo1")
public class ServletDemo1 implements Servlet{}
```
7. 访问：启动 Tomcat，浏览器输入URL访问该Servlet
`http://localhost:8080/web-demo/demo1`
### Servlet 执行流程
Question：ServletDemo1类的对象，该类的services 是认来创建与调用的
==Tomcat Web服务器==
**当我们在后端编写完web项目执行后，会得到一个地址，在浏览器输入该地址：浏览器发出 `http://localhost:8080/web-demo/demo1` 请求，从请求中可以解析三部分的内容是`localhost:8080`、`web-demo` 、`demo1`**
- `localhost:8080` :可以找到要访问的Tomcat Web服务器（之前在部署==修改配置文件==时，将端口改成80于是`localhost` 就可以访问Web服务器的过程是 一样的）
- `web-demo`： 找到Tomcat 服务器上的web-demo 项目
- `demo1`：找到要访问的Servlet 实现类，根据@WebServlet 后面的值进行匹配
### Servlet 生命周期
>已知Servlet 对象及services 是由Tomcat 服务器创建并调用的，问：==Tomcat 什么时候创建的Servlet 对象 ==，是在web项目 启动时，还是当Servlet 第一被访问时。
##### 生命周期概念
一个对象从被创建到被销毁的整个过程
- Servlet 运行在==Servlet容器(Web 服务器)==中，其生命周期由容器来管理，分为==4==个阶段
1. ==加载和实例化==：默认情况下，当Servlet 第一次被访问时，由容器创建Servlet 对象
>由于默认情况下，当Servlet 第一次被访问时，需要创建对象，这是==耗时的==。为了改善：
>把Servlet 的创建放在服务器启动的时候来创建==使用loadOnStartup==：
>==0或正数==：服务器启动时（数字越小，优先级越高）， ==负数：被访问时创建（默认）==
>`@WebServlet （urlPattern = "/dmeo1"，loadOnStartup = 1）`

2. ==初始==：
 在Servlet 对象创建后，服务器会调用==ini() ==方法初始化这个对象，完成一些加载配置文件、 创建连接等初始化的工作。该方法==只调用一次==
3. ==请求处理==
每次访问Servlet 时，Servlet 服务器都会调用Servlet 的service() 方法对请求进行处理
4. ==服务终止==
当需要释放内存或服务器关闭时，服务器会调用Servlet 实例的destroy() 方法来释放资源

***注*** ：如何才能让destroy方法被执行
==在Terminal 命令行中，先使用mvn tomcat7:run 启动，然后再使用ctrl+c 关闭tomcat

***注***：Servlet 生命周期中的三个方法什么时候被调用，调用几次
>init 被==创建的时候执行==，只执行==一==次
>service方法被==访问==的时候调用，==每访问1次就调用1次（页面刷新）==
>destroy方法在Servlet 被==销毁==的时候调用，只执行==1次==
```Java
  /**
  * Servlet生命周期方法
  */
  @WebServlet(urlPatterns = "/demo2",loadOnStartup = 1)
  public class ServletDemo2 implements Servlet {
  
      /**
       *  初始化方法
       *  1.调用时机：默认情况下，Servlet被第一次访问时，调用
       *      * loadOnStartup: 默认为-1，修改为0或者正整数，则会在服务器启动的时候，调用
       *  2.调用次数: 1次
       * @param config
       * @throws ServletException
       */
      public void init(ServletConfig config) throws ServletException {
          System.out.println("init...");
      }
  
      /**
       * 提供服务
       * 1.调用时机:每一次Servlet被访问时，调用
       * 2.调用次数: 多次
       * @param req
       * @param res
       * @throws ServletException
       * @throws IOException
       */
      public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
          System.out.println("servlet hello world~");
      }
  
      /**
       * 销毁方法
       * 1.调用时机：内存释放或者服务器关闭的时候，Servlet对象会被销毁，调用
       * 2.调用次数: 1次
       */
      public void destroy() {
          System.out.println("destroy...");
      }
      public ServletConfig getServletConfig() {
          return null;
      }
  
      public String getServletInfo() {
          return null;
      }
  
  
  }
```
### 方法介绍
>Servlet 是一个接口，写了5种方法
- ==初始化==方法，在Servlet 被创建时执行，只执行一次
`void init(ServletConfig config)`
- 提供==服务==方法，每次Servlet 被访问，都会调用该方法
`void service(ServletRequest req, SevletResponse res)`
- ==销毁==方法，当Servlet 被销毁时，调用该方法。在内存释放或服务器关闭时销毁 Servlet
`void destroy()`
- 获取ServletConfig对象（一些==配置信息==）
`ServletConfig getServletConfig`
- 获取Servlet信息
`String getServletinfo()`
### 体系结构 
==Servlet>GenericServlet>HTTPServlet==
>这是他们之间的关系，GenericServlet继承了Servlet的5个方法并重写，HTTPServlet继承了GenericServlet接口，并把HTTP的请求方式进行封装，封装为doGet/doPost
![](assets/JavaWeb/file-20240802171409248.png)
```java
@WebServlet("/demo4");
public void ServletDemo1 extends HttpServlet{

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("get...");
    }
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Post...");
    }

}
```
### Servlet urlPattern 配置
>Servlet 想要被访问，必须配置其访问路径（==urlPattern==）

1. 一个Servlet ，可以配置多个 urlPattern
`@WebServlet(urlPattern = {"/demo1","/demo2"})`

2. urlPattern 配置规则 
	1. 精确匹配
	配置路径：`@WebServlet("/user/文件名")`      ==user可以为名任意名，相当于类==
	访问路径：`localhost:8080/web-demo/user/exact`
	2. 目录匹配
	配置路径：`@WebServlet("/user/*")`
	访问路径：`localhost:8080/web-demo/user/aaa`  
	         `localhost:8080/web-demo/user/bbb`
	3. 扩展名匹配
	配置路径：`@WebServlet("/user/名.扩展名")`         ==扩展名可以为任意名，相当于一个类==
	访问路径：`localhost:8080/web-demo/user/aaa.h`    
	4. 任意匹配
	配置路径：`@WebServlet("/")`                     `@WebServlet("/*")`   
	访问路径：`localhost:800/web-demo/*`       `localhost:800/web-demo/*`
	
	>/ 和 `/*`==区别==：
	当我们的项目中的Servel 配置了 "/" ,   会==覆盖==掉服务器中的==DefaultServlet==， 当其他的 urlpattern者匹配不上时才会走==另一个Servelt路径==
	==优先级==
	精确路径> 目录路径 > 扩展我名路径 > /* >/

### XML 配置方式编写Servlet
>Servlet 从3.0 版本后开始支持使用注解配置，3.0前都是web.xml 配置方式

步骤：
1. 编写 Servlet类
2. 在 web.xml中配置该Servlet
```java
<servlet>
	<servlet-name> demo5(别名) </servlet-name>
	<servlet-class> com.itheima.web.servlet.ServletDemo5（全路径） </servlet-class>
</servlet>

<servlet-mapping>
	<servlet-name> demo5(别名) </servlet-name>
	<url-pattern> /demo5 (路径) </url-pattern>
</servlet-mapping>
```

## Request & Response
Request：获取请求数据
Response：设置响应数据
### Resquest 对象

#### Request 继承体系
1. Tomcat 会将请求的数据封装为一个request 对象，并且创建request 对象传递到service方法中
2. 使用request 对象，查阅javaEE API文档的HttpServletRequest接口
![](assets/JavaWeb/file-20240802201934648.png)
#### Request 获取请求数据
###### 普通获取请求数据
请求数据分为3部分

1. 请求行：==`GEt/request-demo/req1 ? username = zhangsan HTTP/1.1`==
	- `String getMethod()`：获取==请求方式：GET==
	- String getContextPath：获取虚拟目录（==模块==的路径==）：request-demo
	- Stringbuffer getRequestURL：获取URL（==？号前面的==）
	- String getRequestURI：获取URI（==统一资源标识符==）：request-demo/req1
	- String getQueryString()：获取请求参数（Get方式）：（==? 号后头==）
```java

protected void toGet (HttpServletRequest req , HttpServletResponse res) throws Expcetion{

	//String getMethod()：获取请求方式
	String method = req.getMethod();
	
	//String getContextPath：获取项目路径（虚拟路径）
	String contextpath = req.getContextPath();
	
	//StringBuffered getRequestURL()：获取URL
	String URL = req.getRequestURL;
	
	//String getRequestURI 获取URI
	String URI = req.getRequestURI;
	
	//String getQueryString()：获取请求参数
	String query = req.getQueryString();

}

```
2. 请求头  ==`User-Agent:Mozilla/5.0 Chrome/91.0.4472.106`==
`String getHeader(String name)`：根据请求头名称，获取值    name = =="user-agent"==
3. 请求体 ==`username=superbaby&password=123`==
`ServletInputStream getInputStream():` 获取==字节输入流==
`BufferedReader getReader()` ： 获取==字符输入流==     对象名.readLine();

###### 通用方式获取请求参数
1. `Map<String, String[]> getParameterMap()`获取所有参数Map 集合
```java
Map<String, String[]> map = req.getParameterMap();
for(String key : map.keySet()){
	sout(key+":");

	String[] values = map.get(key);
	for(String val : values){
		sout(val+" ");
	}
	sout();
}

}

```
2. `String[] getParameterValues(String name)`：根据名称获取参数值（数组）
```java
String[] hobbies = req.getParameterValues(hobby);
sout("hobby:);"
for(String hob : hobbies){
	sout(hob+" ");
}
```
3. `String getParameter(String name)`：根据名称获取参数值（单个值）
```java
String username = req.getParameter("username");
sout(username);
```
#### Request 请求参数中文乱码处理
- 请求数据如果存在中文乱码，则会乱码
- 解决方案
1. Post：设置输入流的编码
`req.setCharacterEncoding("UTF-8")`
2. Get：利用他们URL码相同则字节相同的结论，使用byte与String进行编码
![](assets/JavaWeb/file-20240805104407589.png)
```java 
username="张三";

//1.URL编码
        String encode= URLEncoder.encode(username,"utf-8");
        System.out.println("URL编码后："+encode);

        //2.URL解码
        String decode = URLDecoder.decode(encode,"ISO-8859-1");
        System.out.println("URL解码后："+decode);

		//3.把URL转换成字节数组
		byte[] b = decode.getBytes("ISO-8859-1");
		System.out.println("把URL解码后的乱码转成字节："+a.toString());

		//4.再String转换成
		username = new String(a，“ISO-8859-1”);
        System.out.println(username);
```
- URL编码
>将字符串按照编码方式转为二进制
>每个字节转为2个16进制数并在前边加上%
>![](assets/JavaWeb/file-20240805104527042.png)
1. 编码
`URLEncoder.encode(str,"utf-8");`
2. 解码
`URLDecoder.decode(s."ISO-8859-1);`
#### Request 请求转发
>请求转发（forward）：一种在服务器内部的资源跳转方式
![](assets/JavaWeb/file-20240805112420504.png)
- 实现方式：
`req.tggetRequestDispatcher("资源B路径").forward(req,resp);`
- 请求转发资源间==共享数据==：使用Request 对象
`void setAttribute(String name, Object o);` ==存储数据到 Request域中==
`Object getAttribute(String name);` 根据 key，==获取==值
`void removeAttribute(String name);` 根据key , ==删除==该键值对
- 请求转发特点
浏览器地址==路径不发生变化==
只能转发到==当前==服务器的==内部资源==
一次请求，可以在转发的资源==间==使用==request共享数据==
### Response 对象
#### 设置响应数据功能介绍
1. 响应行：HTTP/1.1 200 OK
`void setStatus(int sc);` 设置响应==状态码==
2. 响应头：Content-Type（内容类型）：text/html 
`void setHeader(String name, String value)`：设置响应==头键值对==
[`resp.setContentType("text/html;charset=utf-8); 设置响应头与浏览器编码`](#`resp.setContentType("text/html;charset=utf-8);`)
***区别：***
前者==只能设置响应头内容类型==，后者可以设置响应头内容类型与==浏览器字符集==

3. 响应体：`<html><head>...`
`PrintWriter getWriter();`：获取==字符输出流===
`ServletOutputStream getOutputStream();`：获取字节输出流
#### 完成重定向
>重定向（Redirect）：一种资源==跳转方式==（与request 对象对应[Request 请求转发](#Request%20请求转发)）
![](assets/JavaWeb/file-20240805150026758.png)
- 实现方式：
`resp.setStatus(302)`：设置响应状态码
`resp.setHeader("location","资源B的虚拟路径);`：设置==响应头==
`resp.setHeader("location","/模块名/url-pattern");`
简化方式：
`resp.sendRedirect("/资源B的虚拟路径");` 
- 重定向特点
浏览器地址==未发生变化==
可以重定向到==任意资源==的位置（服务器内部、外部均可）
==两次请求，不能在多个资源使用request 共享数据==

###### 资源路径问题
- 明确路径谁使用
浏览器使用：需要加虚拟目录（项目访问路径）
服务端使用：不需要加虚拟目录

- `<a href='路径' >` 浏览器使用，==需要==加虚拟路径
- `<form action='路径' >` 浏览器使用，==需要==虚拟路径
- `req.getRequestDispatcher("路径")` 服务端==内部转发==，所以服务器使用，==不需要==加虚拟路径
- `resp.sendRedirect("路径")` 重定向中浏览器==再次请求==，==浏览器使用==，所以需要==加==虚拟路径

动态获取虚拟目录
使用request 中的==getContextPath==方法
```java
String contextPath = request.getContextPath();
response.sendRedirect(contextPath + "/resp2");
```
#### 响应字符数据
- 使用：
1. 通过Response 对象获取字符输出流（==getWriter()方法==）
`PrintWriter writer = resp.getWriter();`
2. 写数据（wrtier()方法）
`writer.write("<h1>aaa</h1>");`    可以写标签
***注意***
- 该流==不需要关闭==，随着响应结束而结束，response 对象销毁，由服务器关闭
- 中文数据乱码：原因通过Response 获取的字符输出流默认编码：ISO-8859-1  ， 即响应头的==编码类型为它，所以我们需要重新设置响应头==
方式一：
###### `resp.setContentType("text/html;charset=utf-8);`
方式二：
`resp.setCharaterEncodeing("utf-8");`
#### 响应字节数据
- 使用
1. 通过Response 对象获取字节输出流
`ServletOutputStream outputStream - res.getOutputStream();`
2. 写数据
`outputStream.write(字节数据);`
```java
//获取字节输入流
FileInputStream fis = new FileInputStream("D://aaa.jpg");
//获取字节输出流
ServletOutputStream os = response.getOutputStream();
//遍历输入流，并向输出流中写数据 
byte[] bts = new byte[1024];
int len;
while( (len=fis.read())!=-1 ){
	os.write(len);
}
```
- IOUtils 工具类使用
1. 导入坐标
```java
<dependency>
	<groupId> commons-io </groupId>
	<artifactId> commons-io </artifactId>
	<version> 2.6 </version>
</dependency>
```
2. 使用
`IOUtils.copy(输入流，输出流);`