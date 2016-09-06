/**
 * Created by Administrator on 2016/9/2.
 */
var fs=require("fs");
var file=fs.createReadStream("1.txt",{start:0,end:6});//以流的方式读取文件
var out=fs.createWriteStream("2.txt");//以流的方式写文件

file.on("open", function (fd) {
    console.info("文件打开了");
});
file.on("data", function (data) {
    console.info("读取数据"+data);
    out.write(data, function () {
        console.info(data.toString());

    });

});
file.on("end", function () {
    console.info("文件写入完成");
    out.end("\r\n完了", function () {
        console.info("写完了");
    })
    out.end();
});
file.on("close", function () {
    console.info("文件被关闭");
});
file.on("error", function (err) {
    console.info(err);
});