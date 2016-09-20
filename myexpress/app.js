/**
 * Created by Administrator on 2016/9/13.
 */
var app=require("express");
app.get("/", function (req,res) {
    res.send("访问成功");
    res.sendFile(__dirname+"/index.html");
});
app.listen(8888, function (err) {
    if(err){
        console.info(err);
    }else {
        console.info("服务器启动成功");
    }
});