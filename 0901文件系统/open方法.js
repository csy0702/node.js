/**
 * Created by Administrator on 2016/9/1.
 */
//指定位置读写文件
var fs=require("fs");
/*
* fs.open(path, flags[, mode], callback)
参数使用说明如下：
path - 文件的路径。
flags - 文件打开的行为。具体值详见下文。
mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
callback - 回调函数，带有两个参数如：callback(err, fd)。

读取文件。
 fs.read(fd, buffer, offset, length, position, callback)
参数使用说明如下：
fd - 通过 fs.open() 方法返回的文件描述符。
buffer - 数据写入的缓冲区。
offset - 缓冲区写入的写入偏移量。
length - 要从文件中读取的字节数。
position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。

 * */
//r  读方式   w写方式    a   追加方式
//  fd为打开的一个文件的引用
fs.open("yc.txt","r", function (err,fd) {
    if(err){
        console.info("以读的方式打开文件");
    }else {
        var buf=new Buffer(255);//len为实际读到的字节数
        fs.read(fd,buf,2,12,0, function (err,len,bf) {
            console.info(buf.toString());
            console.info(len);
            console.info(bf.slice(0,12).toString());

            fs.read(fd,buf,12,12,null, function (err,len1,bf1) {
                console.info(buf.toString());
                console.info(bf1.slice(12,24).toString());
            })
        })
    }
})

//同步方式
var fd=fs.openSync('yc.txt','r');
var buf1=new Buffer(100);
var len=fs.readSync(fd,buf1,0,12);
console.info(buf1.slice(0,len).toString());
len=fs.readSync(fd,buf1,12,12,null);
console.info(buf1.slice(12,24).toString());

//从指定位置写入

var buf2=new Buffer("哈哈哈");
fs.open('yc.txt','a',function(err,fd){
    if(err){
        console.info("打开文件失败");
    }else {
        fs.write(fd,buf2,0,buf2.length,24, function (err,writeLen,buffer) {
            if(err){
                console.info("写入文件失败");
            }else {
                console.info(writeLen);
                console.info(buffer.toString());
            }
        })
    }
})