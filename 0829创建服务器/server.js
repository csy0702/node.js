/**
 * Created by Administrator on 2016/8/29.
 */
var http=require('http');
http.createServer(function (request,response) {//创建一个服务器  request对象为客户请求的数据  response对象为服务器回送的数据
    //console.info(request);
    //console.info(response);
    response.write("helloword");
    response.end();//响应结束

//}).listen(666,'192.168.20.22')//指定服务器监听的ip地址和端口号，如果监听所有地址，则ip可以省略
}).listen(6666);//根据ip地址访问到你的服务器，根据端口号找到你的应用程序    端口号必须有   确定你是哪一个应用程序  如qq一个窗口对话框为


console.info("服务器已经启动，占用的端口为:6666");

console.log(__dirname);//当前文件所在的目录
console.log(__filename);//当前的文件的文件名