/**
 * Created by Administrator on 2016/9/20.
 */
var express=require("express");
var bodyparser=require("body-parser");//涉及到文件上传就不能使用get请求，
// 因为文件的比较大  主要用来转换post请求中的数据，将post请求中的数据转为对象，和处理图片上传
var app=express();
var fs=require("fs");

app.use(bodyparser.urlencoded({extended:false}));//设置这个应用程序使用bodyparser中间件   相当于框架中调用他的方法
app.use(express.static(__dirname));
app.post("/uploadPhoto", function (req,res) {//请求地址为uploadPhoto的post请求
    console.info(req.body);
    var bitmap=new Buffer(req.body.imgdata,"base64");
    fs.writeFile("./img/"+new Date().getTime()+".png",bitmap, function (err) {
        if(err){
            res.send("0");
        }else {
            res.send("1");
        }
    })
});

app.post("/getAllphoto", function (req,res) {

    //读取image下的所有文件
    fs.readdir("./img", function (err,files) {

        if(err){
            console.info(err);
            res.send("0");
        }else {
            res.send(files);
        }
    })
})
app.listen(8080, function (err) {
   if(err){
       console.info(err);
   } else {
       console.info("应用程序启动成功");
   }
});