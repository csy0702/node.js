/**
 * Created by Administrator on 2016/9/2.
 */
var net=require("net");
var fs=require("fs");
/*
var server=net.createServer(function (socket) {//socket套间字
    console.info("有客户端连接上了");
    console.info(socket);
})
//server.listen(8888);

server.listen(8888,function(){
    console.info("服务器开始监听");
    var addr=server.address();//服务器监听的地址
    console.info("监听的地址信息为:%j",addr);//字符串 %s  整形  %d或  %i    浮点数%f   对象  %o 或  %j
});
*/
/*
//创建服务器时如果没有指定回调函数，也可以在创建服务器之后，再通过connection事件来创建一个事件处理函数
var server=net.createServer().listen(8888);
server.on("connection", function (socket) {
    console.info("有客户端连上了");
    //获取客户端的访问地址
    console.info(socket.address());
})
*/

//监听服务器连接的数量
var file=fs.createWriteStream("1.txt");
var server=net.createServer(function (socket) {
    socket.setEncoding("utf8");
    /*
    * 可以利用socket对象中pipe(destination,[options])将接受到的数据写入到指定的文件中
    * destination:文件
    * options:是一个对象，其中有一个end属性，如果为true，将数据全部接受，并自动关闭
    *
    * */
    socket.on("data", function (data) {//当客户端有数据发送过来时，就会触发这个函数
        //将接受到的数据全部存放到一个文件中;
       // socket.pipe(file);//如果不要自动关闭，就手动关闭，将end设为false;
        socket.pipe(file,{end:false});
    });
    socket.on("end", function () {
        file.end("\r\n未完待续...");
       console.info("用户一下载，写入完成");

    });
});

//当端口设置为0的时候，则端口是由系统随机分配的
server.listen(3040,"127.12.12.12", function () {//监听服务器的连接数量
    console.info("服务器开始启动，监听端口为:%j",server.address());
})
