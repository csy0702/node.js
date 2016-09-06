/**
 * Created by Administrator on 2016/8/30.
 */

var http=require("http");
var event=require("events");
var server=http.createServer();

//通过on对同一个事件绑定多个事件处理函数

server.on("request", function (req,res) {
    if(req.url!="/favicon.ico"){
        console.info("接受到了客户端获取图标的信息");
    }
});

server.on("request", function (req,res) {
    if(req.url!="/favicon.ico"){
        console.info("发送响应信息。。");
        res.write("<!doctype html><head><title>哈哈哈哈</title><meta charset='utf-8'/></head>");
        res.write("<body><h1>欢迎光临。。。</h1></body>");
        res.end();
    }
});


server.on("request", function (req,res) {
    if(req.url!="/favicon.ico"){
        console.info("响应发送完毕");
    }
});

server.listen(8888);
console.info(event.EventEmitter.listenerCount(server,"request"));
//在默认情况下，同一个事件，最多可以绑定10个事件处理函数，可以通过setMaxListener方法修改最多可以绑定的事件处理函数
