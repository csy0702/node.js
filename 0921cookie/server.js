/**
 * Created by Administrator on 2016/9/21.
 */

// cookie适用于存客户端的数据，而session是服务器用来存数据的

var express=require("express");
var cookieparser=require("cookie-parser");
var bodyparser=require("body-parser");

var app=express();

app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieparser());

app.post("/userLogin", function (req,res) {
    console.info(req.body);
    if(req.body.uname=="yc"&& req.body.pwd=="123"){
        //服务器向客户端设置cookie   过期时间
        //send是自动给我们发送头部   如果我们手动设置头部的话就要用end
        res.writeHead(200,"ok",{"Set-cookie":"uname=yc;expires=Wed,21-Sep-16 15:00:00 GMT;"})
        res.end("1");//说明用户登录成功
    }else {

        res.send("0");//登录失败
    }

    //获取客户端传过来的cookie信息
    console.info(req.cookies);
    for(var key in req.cookies){
        console.info(key+":"+req.cookies[key]);
    }

});
app.listen(6060, function (err) {
    if(err){
        console.info(err);
    }else {
        console.info("服务器启动成功");
    }
});
