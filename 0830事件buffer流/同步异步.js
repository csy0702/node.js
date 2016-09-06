/**
 * Created by Administrator on 2016/8/31.
 */
var fs=require("fs");
fs.writeFile("yc.txt","源辰信息","utf8", function (err) {
    if(err){
        console.info("写入文件失败");
    }else {
        console.info("读取数据完成");
    }
})

// 异步读取
fs.readFile('yc.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("异步读取: " + data.toString());
});

// 同步读取
var data = fs.readFileSync('yc.txt','utf8');
console.log("同步读取: " + data);

console.log("程序执行完毕。");

fs.appendFile("yc.txt","\r\n这是异步后面添加的数据", {"encoding":"utf8"})