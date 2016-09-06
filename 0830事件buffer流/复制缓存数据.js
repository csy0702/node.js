/**
 * Created by Administrator on 2016/8/31.
 */
var buf1=new Buffer("源辰信息科技有限公司");
var copybuf=new Buffer();
/*
* 第一个参数是将数据复制到的新对象
* 第二个参数是从新对象的哪个位置开始存放复制过来的数据
* 第三个参数是从原数据的哪个位置开始复制
* 第四个参数数据长度
* */
buf.copy(copybuf,0,0,12);

/*
* buffer对象中常用方法
* toString()  将buffer对象中的数据以字符串输出
* isBuffer()   判断是不是一个buffer对象
* byteLength()   计算一个字符串的字节数
* */
