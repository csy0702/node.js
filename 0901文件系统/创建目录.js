/**
 * Created by Administrator on 2016/9/1.
 */
/*
创建目录
fs.mkdir(path[, mode], callback)
参数
path - 文件路径。
mode - 设置目录权限，默认为 0777。
callback - 回调函数，没有参数。

读取目录
fs.readdir(path, callback)
参数
path - 文件路径。
callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。

* */

var fs=require("fs");
//异步
fs.mkdir("./test", function (err) {
    if(err){

    }else {
        console.info("目录创建成功");
    }
})
//同步
//fs.mkdir("./test");

//异步读取目录
/*
fs.readdir("./", function (err,files) {
    if(err){
        console.info("读取目录成功");
    }else {
        console.info(files);
    }
})
*/
//同步读取
var fls=fs.readdirSync("./");
console.info(fls);
/*
* fs.stat(path, callback)
参数
path - 文件路径。
callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
* */
//查看文件或目录信息
fs.stat("yc.txt", function (err,stats) {
    console.info(stats.size);
})


//判断文件是否存在
fs.exists('yc.txt',function(exists){
    console.info(exists);
})


//获取文件或目录的绝对路径
//fs.realpath(path,[cache],callback);
//cache  一个对象 其中存放一些预先指定的路径
fs.realpath('yc.txt', function (err,path) {
    if(!err){
        console.info(path);
    }
})
