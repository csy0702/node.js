/**
 * Created by Administrator on 2016/8/30.
 */
var yc=require("./yc/yc");

var myyc=new yc();
console.info("获取公有属性name:"+myyc.name);
console.info("获取公有属性age:"+myyc.age);//在对象中并没有将此公有属性传递到模块外，所以获取不到

console.info(myyc.getName());//undefined  因为我们在new的时候并没有传入参数

var myyc1=new yc("csy",20);
console.info(myyc1.getName());
console.info(myyc1.getAge());

myyc1.setAge(110);

console.info(myyc1.getAge());

myyc1.setName("哈哈哈");
console.info(myyc1.getName());
console.info(myyc1.getAge());