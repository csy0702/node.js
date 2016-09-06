/**
 * Created by Administrator on 2016/8/31.
 */

var buf=new Buffer("源辰信息科技有限公司");
var str=buf.slice(3,6);
console.info(str.toString());
console.info(buf.toString());
//修改通过slice()方法取出的字符
str[0]=buf[0];
str[1]=buf[1];
str[2]=buf[2];
//因为buffer对象slice()方法不是复制缓存区的数据。而是与该缓存区共享，通过任何一个应用修改了缓存区的值，那么缓存区的值都会被修改
console.info(buf.toString());

/*buffer对象与字符串对象   从缓冲区读取数据
buf.toString([encoding[, start[, end]]])
参数:
 encoding - 使用的编码。默认为 'utf8' 。
 start - 指定开始读取的索引位置，默认为 0。
 end - 结束位置，默认为缓冲区的末尾。
  */
console.info(buf.toString("utf8",0,12));
console.info(buf.toString("utf8",12));//从第12个字节开始到最后

/**
 * 写入缓冲区
 * buf.write(string[, offset[, length]][, encoding])
 参数
 参数描述如下：
 string - 写入缓冲区的字符串。
 offset - 缓冲区开始写入的索引值，默认为 0 。
 length - 写入的字节数，默认为 buffer.length
 encoding - 使用的编码。默认为 'utf8' 。
 返回值
 返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
 */
var str='源辰信息科技有限公司';
var buf=new Buffer(str);
console.info(buf.toString());

//重写buf中的值
buf.write('ycycyc',2,6);//替换前两个字
console.info(buf.toString());
