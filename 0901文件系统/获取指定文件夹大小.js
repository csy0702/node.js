/**
 * Created by Administrator on 2016/9/1.
 */
var fs=require("fs");
var tatal=0;
function getSize(path){
    var stats=fs.statSync(path);
    if(stats.isDirectory()){
        var files=fs.readdirSync(path);
        for(var i=0;i<files.length;i++){
            getSize(path+"/"+files[i]);
        }
    }else if(stats.isFile()){
        tatal+=stats.size;
    }
}

getSize("../图片");
console.info(tatal);