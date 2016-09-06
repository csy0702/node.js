/**
 * Created by Administrator on 2016/8/30.
 */
var http=require("http");
var server=http.createServer();
//通过on对同一个事件绑定多个事件处理函数

var testFun= function (req,res) {
    if(req.url!="/favicon.ico"){
        console.info("接受到了客户端获取图标的信息");
    }
}


server.on("request", function (req,res) {
    if(req.url!="/favicon.ico"){
        console.info("发送响应信息。。");
        res.write("<!doctype html><head><title>哈哈哈哈</title><meta charset='utf-8'/></head>");
        res.write("<body><h1>今天你好。。。</h1></body>");
        res.end();
    }
});


server.on("request", function (req,res) {
    if(req.url!="/favicon.ico"){
        console.info("响应发送完毕");
    }
});
server.on("request",testFun);
server.removeListener("request",testFun);//这里将request上的testFun函数移出了


server.listen(8888);