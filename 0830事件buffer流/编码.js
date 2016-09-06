/**
 * Created by Administrator on 2016/8/31.
 */

var buf=new Buffer([0x10,0x20]);
console.info(buf.readUInt8(0));
console.info(buf.readUInt8(1));

buf.writeUInt8(30,0);//将第一个值修改了
console.info(buf);

buf.writeInt8(-1);
console.info(buf.readInt8());//-1
console.info(buf.readUInt8());//255
//转换为有符号的转换为无符号的则是将源码转换为补码

//buffer对象个字符串之间的转换
var buf1=new Buffer("源辰信息科技有限公司");

console.info(buf1);

var json=JSON.stringify(buf1);
var jsonobj=JSON.parse(json);

console.info(json);
console.info(jsonobj.data);

var buf3 = new Buffer('www.runoob.com');
var json1 = buf.toJSON(buf3);

console.log(json1);

