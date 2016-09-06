/**
 * Created by Administrator on 2016/9/1.
 */
var fs=require("fs");
//截断文件，修改文件大小
fs.truncate("yc.txt",30, function (err) {
    if(err){
        console.info(err);
    }else {
        console.info("文件截断成功");
    }
})

//监视文件
//fs.watchFile(file,options,listener)  options用来指定每隔多少毫秒监视文件是否发生改变
fs.watchFile("yc.txt", function (curr,prey) {

})