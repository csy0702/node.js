/**
 * Created by Administrator on 2016/9/1.
 */
var fs=require("fs");
fs.rename("yc.txt","test/abc.txt",function(err){
    if(err){

    }else {
        console.info("文件移动成功");
    }
})

fs.rmdir("test/w",function(err){
    if(err){

    }else {
        console.info("文件删除成功");
    }
})