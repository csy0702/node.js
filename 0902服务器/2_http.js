/**
 * Created by Administrator on 2016/9/2.
 */
/*    //方法一
var http=require("http");
var server=http.createServer(function(req,res){
    console.info("有人连接上来了");
    res.write("<meta charset='utf-8'/>");
    res.write("哈哈哈");
    res.end();
}).listen(6666, function () {
    console.info("服务器已经启动");
})

//方法二
var http=require("http");
var server=http.createServer().listen(6666, function () {
    console.info("服务器已经启动");
})
server.on("request",function(req,res){
    console.info("有人连接上来了");
    res.write("<meta charset='utf-8'/>");
    res.write("hahah");
    res.end();
});

*/
//方法三

var fs=require("fs");
var querystring=require("querystring");
var url=require("url");
var http=require("http")
var server=http.createServer().listen(6666, function () {
    console.info("服务器已经启动");
})

//当客户端请求时触发这个函数
server.on("request",function(req,res){
    //console.info(req.url);
    //console.info(req.method);

    if("/favicon.ico"!=req.url){
        var urlobj=url.parse(req.url);
//根据不同的请求地址，进行不同处理并返回不同的结果

        if(urlobj.pathname=="/"){//默认返回index.html
            readFile("index.html",res);
        }else  if(urlobj.pathname=="/addUser"){//如果是添加用户请求
            //先获取用户名和密码
            var dataObj=querystring.parse(urlobj.query);
            if(dataObj.uname=="yc"&&dataObj.pwd=="123"){//先获取用户名和密码
                readFile("suc.html",res);
            }else {
                readFile("fail.html",res);
            }
        }else if(urlobj.pathname=="/reg"){
            readFile("fail.html",res);
        }else {
            res.writeHead("606","bad request...",{"Content-Type":"text/html;charset='utf-8"});
            res.write("hahah");
            res.end();
        }




       /* var urls=req.url;
        urls=urls.replace("/?","");
        var obj=querystring.parse(urls);//得到页面上输入的帐号密码
        console.info(obj);
       // console.info("用户名:"+obj.uname);
        //console.info("密码:"+obj.pwd);
        var file=fs.createReadStream("."+req.url);
        file.on("data", function (data) {
            res.write(data);
        });
        file.on("end", function () {
            res.end();
        })
        */
    }




    //server.close();//关闭服务器
});


function readFile(path,res){
    var file=fs.createReadStream(path);
    file.on("data", function (data) {
        res.write(data);
    });
    file.on("end", function () {
        res.end();
    })
}
server.on("connection",function(socket){
    console.info(socket.address().address);

});
server.on("close",function(req,res){
    console.info("关闭服务器");

});
server.on("error",function(err){
    console.info(err);
    if(err.code=="EADDRINUSE"){
        console.info("端口号被占用");
    }
});