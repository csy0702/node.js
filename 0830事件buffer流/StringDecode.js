/**
 * Created by Administrator on 2016/8/31.
 */
var StringDecode=require("string_decoder").StringDecoder;//对拆分的字符串也能完整的输出
var str="源辰信息科技有限公司";
var buf=new Buffer(str);
console.info(buf);

var decoder=new StringDecode();
console.info(decoder.write(buf));

//我们将str存到两个buffer对象中，第一个存放10个，第二个存放20个
var buf1=new Buffer([0xe6, 0xba, 0x90, 0xe8, 0xbe, 0xb0, 0xe4, 0xbf, 0xa1, 0xe6]);
var buf2=new Buffer([0x81, 0xaf, 0xe7, 0xa7, 0x91, 0xe6, 0x8a, 0x80, 0xe6, 0x9c, 0x89, 0xe9, 0x99, 0x90, 0xe5, 0x85, 0xac, 0xe5, 0x8f, 0xb8]);
console.info(buf1.toString()+buf2.toString());//这样子会乱码，因为没有读完就被分割了

//将两个buffer对象合并到一起；

var str3=Buffer.concat([buf1,buf2]);
console.info(str3.toString());//这样拼接会影响系统性能；

//可以直接用StringDecode输出，不会出现乱码
console.info(decoder.write(buf1));
console.info(decoder.write(buf2));

