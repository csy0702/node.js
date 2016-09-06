/**
 * Created by Administrator on 2016/8/29.
 */
var text="今天";
var txt="hello word";

exports.test=text;//将text变量通过exports对象传递到模块外，其他模块就可以访问这个变量了
exports.info=txt;


var count=1;
function test1(msg){
    console.log(msg+" "+count);
    count++;
    if(count==10){
        clearInterval(mytimer);
    }
}
//第一个参数为要执行的方法，即函数，第二个参数为隔多少毫秒后执行一次，第三个参数为执行方法的参数
var mytimer=setInterval(test1,1000,"你好");


var output= function () {
    console.log("哈哈哈");
}
exports.output=output;