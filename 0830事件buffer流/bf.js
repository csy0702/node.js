/**
 * Created by Administrator on 2016/8/30.
 */

//创建指定长度的buffer对象
//buffer是以十六进制代替二进制的
var buf=new Buffer(10);
buf.fill(10);
console.info(buf.length);
console.info(buf);

//创建指定值的buffer
var buf1=new Buffer([10,20,30,40,50]);
console.info(buf1.length);
console.info(buf1);

//通过一个字符串来创建buffer对象，将自动执行字符串的输入和输出时的编码和解码的处理
//默认是utf的，支持的编码:  ascii  utf8
var buf2=new Buffer("ycinfo","utf8");
console.info(buf2.length);
console.info(buf2);

var str="源辰信息科技有限公司";
buf3=new Buffer(str);
console.info(str.length);
console.log(buf3.length);//一个utf8字符占用3个字节  而gbk是占用2个字节

//可以通过索引下标访问字符串对象或缓存区中的数据，但是，在获取数据时，字符串对象也是以文字作为一个单位的，而缓存区对象以字节为一个单位

console.info(str[2]);
console.info(buf3[2]);

str[1]=['金'];
console.info(str);//字符串长度一旦创建，就不能修改
//而buffer对象时可以修改的，可以通过序号来修改其中的某个字节处的数据

//这里是获取第三个字的utf8的编码
console.info(buf3[6]);
console.info(buf3[7]);
console.info(buf3[8]);
/*
buf3[0]=0xe8;//232
buf3[1]=190;
buf3[2]=176;
*/
//将编码指定个第一个字，进而修改第一个字
buf3[0]=228;
buf3[1]=191;
buf3[2]=161;
console.info(buf3.toString());//将缓存区的数据以字符串输出