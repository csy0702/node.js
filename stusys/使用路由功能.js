/**
 * Created by Administrator on 2016/9/13.
 */
var app=require("express")();
app.get("/index.html/:id/:name", function (req,res) {
    console.info(req);
    var str='';
    for(var key in req.params){
        if(str!=""){
            str+="<br/>";
        }
        str+="参数名："+key+"参数值:"+req.params[key].toString();
    }
    res.send(str);
});
app.listen(6868, function (err) {
    if(err){
        console.info(err);
    }else {
        console.info("服务器启动成功");
    }
})