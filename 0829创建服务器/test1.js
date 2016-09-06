/**
 * Created by Administrator on 2016/8/29.
 */
console.info(__dirname);
console.info(__filename);

console.log("this is log");
console.info("this is info");
console.error("this is error");
console.warn("this is warn");

console.time("test");//任意给定一个字符串，之一要跟timeEnd("")中的字符串一样  ，可以输出这一段代码执行所需要的时间;
for(var i=0;i<100;i++){

}
console.timeEnd("test");

/*
process.stdout.write("this is");//这个线程优先
process.stderr.write("that is");

process.stdout.write("请输入");
process.stdin.setEncoding("utf-8");//设置编码集
process.stdin.on('data',function (data) {//监听用户的输入，用户输入的信息会自动保存到回调函数的data中
    console.info(data);
})

process.stdout.write("请输入");
process.stdin.setEncoding("utf-8");
process.stdin.on('readable',function () {//当有信息可以读取的时候，此时回调函数中没有参数
    console.info(process.stdin.read());//读输入取用户的
})
*/

var yc=require("./yc");
console.info(yc.test);
console.info(yc.info);

var yc1=require("./yc");
var yc2=require("./yc");
//这样就可以输出两次   哈哈哈
yc1.output();
yc2.output();