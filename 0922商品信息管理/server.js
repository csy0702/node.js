var express=require("express");//创建服务器
var cookieparser=require("cookie-parser");//cookie
var bodyparser=require("body-parser");//处理文件请求
var session=require("express-session");//session
var mysql=require("mysql");
var fs=require("fs");
var multer=require("multer");//处理文件上传的


var app=express();//创建一个应用程序


//配置和使用bodyparser中间件
app.use(bodyparser.urlencoded({extended:false}));

//配置和使用session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false,maxAge:1000*60*2 }//maxAge过期时间
}))

//配置文件上传的中间件

var upload=multer({dest:"./page/pic"});//上传图片的目录设定

//配置数据库连接池
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"goods",
    user:"root",
    password:"279293"
});

//监听所有类型的请求，  监听先登录
app.all("/back/*",function(req,res,next){
    if(req.session.currentLoginUser==undefined){
        res.send("<script>alert('请先登录');location.href='/index.html';</script>");
    }else {
        next();//请求将往下传递，知道遇到对应的处理接口
    }
})

//处理用户注册的方法
app.post("/userRegister", function (req,res) {
    var result="0";
    if(req.body.uname==""){
       res.send("1");//用户名为空
    }else if(req.body.pwd==""){
        res.send("2");//说明密码为空
    }else if(req.body.pwd!=req.body.pwdagain){
        res.send("3");//说明两次密码不一致
    }else{
        pool.getConnection(function (err,connenction) {
            if(err){
                res.send("4");//说明数据库连接失败
            }else {
                connenction.query("insert into adminInfo values(0,?,?)",[req.body.uname,req.body.pwd], function (err,result) {
                    connection.release();//释放连接池
                    if(err){
                        res.send("5");//说明添加数据失败
                    }else {
                        res.send("6");//注册成功，数据添加成功
                    }
                })
            }

        })
    }
})

app.post("/userlogin", function (req,res) {
    if(req.body.uanme==""){
        res.send("1");
    }else if(req.body.pwd==""){
        res.send("0");
    }else {
        pool.getConnection(function (err,connection) {
           if(err){
               res.send("3");
           } else {
               connection.query("select aid,aname,pwd from adminInfo where aname=? and pwd=?",[req.body.uname,req.body.pwd], function (err,result) {
                   connection.release();//释放连接池
                   if(err){
                       res.send("4");
                   }else {
                       console.info(result);
                        if(result.length>0){//说明用户登录成功，需要精用户信息存到session
                            req.session.currentLoginUser=result[0];
                            res.send("6");
                        }else{
                            res.send("5");
                        }
                   }
               })

           }
        });
    }
});

app.get("/checkUserName", function (req,res) {//验证用户名是否可用
    console.info(req.query);
    if(req.query.uname==""){
        res.send("1");
    }else {
        pool.getConnection(function (err,connection) {
            if(err){
                res.send("1");
            }else {
                connection.query("select * from ?? where ??=?",[req.query.tabName,req.query.colName,req.query.uname], function (err,result) {
                    connection.release();//释放连接池
                    if(err){
                        res.send("1");
                    }else {
                        if(result.length>0){//说明已经有这个用户的数据
                            res.send("1");
                        }else {
                            res.send("0");
                        }
                    }

                })
            }
        })
    }
})
app.get("/userIsLogin", function (req,res) {
    console.info(req.session);
    if(req.session.currentLoginUser==undefined){
        res.send("0");
    }else {
        res.send(req.session.currentLoginUser.aname);
    }
});

app.get("/getAllTypes", function (req,res) {
    pool.getConnection(function (err,connection) {
        res.header("Content-Tpye","application/json");//设置回送的请求头
        if(err){
            res.send('{"err":"0"}');//josn数据要用{}变成对象
        }else {
            connection.query("select tid,tname,status from goodstype", function (err,result) {
                connection.release();//释放连接池
                if(err){
                    res.send('{"err":"0"}');
                }else {
                    res.send(result);
                }
            })
        }
    })
})

//使用静态中间件
app.use(express.static("page"))//默认到pages文件下查找静态资源

app.listen(8080, function (err) {
    if(err){
        console.info(err);
    }else {
        console.info("服务器启动成功");
    }
})