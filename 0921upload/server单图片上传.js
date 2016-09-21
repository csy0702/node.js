/**
 * Created by Administrator on 2016/9/21.
 */
var express=require("express");//创建应用程序
var fs=require("fs");
var multer=require("multer");//文件上传模块
var upload=multer({dest:'imgs/'});//指定文件上传的目录
var app=express();//创建一个应用程序
//使用静态中间件
app.use(express.static(__dirname));
//upload.single("file")单个的图片
app.post("/uploadFile",upload.single("file"), function (req,res,next) {
    console.info(req.file);
    console.info(req.body);
    if(req.file==undefined){//说明用户没有选择图片
        res.send();
    }else {

            var path=__dirname+"/imgs/"+req.file.originalname;
            //重命名
            fs.renameSync(req.file.path,path);//重命名
            response={
                message:"文件上传成功",
                filename:req.file.originalname
            }



    }
    res.send(JSON.stringify(response));
});

app.listen(8888, function (err) {
    if(err){
        console.info(err);
    }else {
        console.info("服务器启动成功");
    }
});


