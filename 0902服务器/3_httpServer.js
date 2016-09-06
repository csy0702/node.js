/**
 * Created by Administrator on 2016/9/4.
 */
var http=require("http");
var options={//也可以直接是一个网站地址，它会自动进行转换
  host:"www.baidu.com",
    post:80,
    path:"/index.html",
    method:"get"
};
//var options="http://www.hao123.com";
var req=http.request(options, function (res) {
    console.info(res.statusCode);//获取响应码
    console.info(JSON.stringify(res.headers));//获取响应头信息并将其转换为一个json格式的字符串
    res.on("data", function (data) {
        console.info(data.toString());
    })
});

req.on("error", function (err) {
    console.info(err);
})

req.end();