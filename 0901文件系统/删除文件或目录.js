/**
 * Created by Administrator on 2016/9/1.
 */

var fs=require("fs");

function del(path){
    var stats=fs.statSync(path);
    //删除目录下的文件
    if(stats.isDirectory()){
        var files=fs.readdirSync(path);
        for(var i=0;i<files.length;i++){
            del(path+"/"+files[i]);
        }
    }else if(stats.isFile()) {
        fs.unlink(path,function(err){
            if(err){
                console.info(err);
            }else {
                console.info("文件删除成功");
            }
        })
    }
    //删除目录
    fs.rmdir(path);
}

del("test");
