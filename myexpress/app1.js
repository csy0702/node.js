/**
 * Created by Administrator on 2016/9/20.
 */
var express=require("express");
//var querystring=require("querystring");

var app=express();
var bodyParser=require("body-parser");
app.use(express.static(__dirname));//指定这个应用程序使用express模块中的static中间件，并指定一当前服务器文件所在的目录为基础
app.use(bodyParser.urlencoded());//创建post请求

app.get("/userLogin", function (req,res) {
    /*var urlstr=req.url;   在http的包当中要的要用户传过来的数据就必须进行截取
    urlstr=urlstr.replace("/?","");
    var obj=querystring.parse(urlstr);
    console.info(obj);
    */
    console.info(req.url);
    console.info(req.query);//得到页面输入的用户名和密码
    res.send();
});
app.post("/userLogin", function (req,res) {

    console.info(req.body);//得到页面输入的用户名和密码  使用post提交调用bodyParser这个包
    res.send();
});
//static中间件
/*
app.get("/*", function (req,res) {
    console.info(req.url+"===");
    res.sendfile(__dirname+req.url);
})
*/
app.listen(6868, function (err) {
    if(err){
        console.info(err);
    }else {
        console.info("应用程序启动成功。。");

    }
});