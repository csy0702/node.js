var express=require("express");//创建服务器
var cookieparser=require("cookie-parser");//cookie
var bodyparser=require("body-parser");//处理文件请求
var session=require("express-session");//session
var mysql=require("mysql");
var fs=require("fs");
var multer=require("multer");//处理文件上传的
var log4js=require("log4js");

var app=express();//创建一个应用程序


//配置和使用bodyparser中间件
app.use(bodyparser.urlencoded({extended:false}));

//配置和使用session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false,maxAge:1000*60*20 }//maxAge过期时间
}))
var fileUploadPath="/page/pic";//存入服务器的路径

var fileUploadPathData="/pic";//存入数据库中路径，主要要除掉static中的路径
//配置文件上传的中间件

var upload=multer({dest:"."+fileUploadPath});//上传图片的目录设定

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
//用户登录
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
//验证用户名是否可用
app.get("/checkUserName", function (req,res) {
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
//刷新登录
app.get("/userIsLogin", function (req,res) {
    console.info(req.session);
    if(req.session.currentLoginUser==undefined){
        res.send("0");
    }else {
        res.send(req.session.currentLoginUser.aname);
    }
});
//显示商品的类型，在select的框中
app.get("/getAllTypes", function (req,res) {
    pool.getConnection(function (err,connection) {
        res.header("Content-Tpye","application/json");//设置回送的请求头
        if(err){
            res.send('{"err":"0"}');//josn数据要用{}变成对象
        }else {
            connection.query("select tid,tname,status from goodstype where status=1", function (err,result) {
                connection.release();//释放连接池
                if(err){
                    res.send('{"err":"0"}');
                }else {
                    res.send(result);
                }
            })
        }
    })
});

//添加商品类型
app.post("/addGoodsType", function (req,res) {
    console.info(req.body);
    if(req.body.tname==""){
        res.send("0");
    }else {
        pool.getConnection(function (err,connection) {
            if(err){
                res.send("0");
            }else {
                connection.query("insert into goodsType values(0,?,1)",[req.body.tname], function (err,result) {
                    connection.release();
                    if(err){
                        res.send("0");
                    }else {
                        res.send(result.insertId+"");
                    }
                })
            }
        })
    }
});

//删除商品，其实就是对其隐藏
app.post("/delGoodsType", function (req,res) {//删除商品类型
    if(req.body.tid==""){
        console.log("没有获取到");
        res.send("0");
    }else {
        pool.getConnection(function (err,connection) {
            if(err){
                res.send("2");
                console.log(err);
            }else {
                connection.query("update goodsType set status=0 where tid=?",[req.body.tid], function (err,result) {
                    connection.release();
                    if(err){
                        res.send("3");
                        console.log(err);
                    }else {
                        res.send("1");
                    }
                });
            }

        });
    }
});

//添加商品信息的
app.post("/addGoods", upload.array("pic"),function (req,res) {//上传图片必须要指明是单张还是多张
    if(req.body.tid==""||req.body.pname==""||req.body.price==""){
        res.send("0");
    }else {
        pool.getConnection(function (err,connection){
            if(err){
                res.send("2");
            }else {
                var fileName="";
                var filePath="";
                var file;
                if(res.files!=undefined){
                    for(var i in req.files){
                        file=req.files[i];
                        fileName=new Date().getTime()+"_"+file.originalname;
                        fs.renameSync(file.path,__dirname+fileUploadPath+"/"+fileName);
                        if(filePath!=""){
                            filePath+=",";
                        }
                        filePath+=fileUploadPathData+"/"+fileName;//1.jpg,2.jpg

                    }
                }
                connection.query("insert into goodsInfo values(0,?,?,?,?)",[req.body.pname,req.body.price,filePath,req.body.tid], function (err,result) {
                    connection.release();//将 status=0的状态设置为0 ，查询的时候就只查询状态为1的，不能直接删除，不然的话这一类的信息就不能用了
                    if(err){
                        console.info(err);
                        res.send("3");
                    }else {
                        res.send("1");
                    }
                });
            }

        });
    }
});
function getTotal() {
        pool.getConnection(function (err,connection) {
            if(err){
                return 0;
            }else {
                connection.query("select count(git) as total from goodsInfo", function (err,result) {
                    connection.release();
                    if(err){
                        res.send('{"err":"0"}');
                        console.log(err);
                    }else {
                        res.send("result");
                    }
                });
            }

        });
}

//得到所有的商品信息
app.get("/getAllGoodsInfo", function (req,res) {
    pool.getConnection(function (err,connection) {
        res.header("Content-Type","application/json")
        if(err){
            res.send("2");
            console.log(err);
        }else {
            connection.query("select g.*,tname from goodsInfo g,goodstype t where g.tid=t.tid", function (err,result) {
                connection.release();
                if(err){
                    res.send('{"err":"0"}');
                    console.log(err);
                }else {
                    res.send("result");
                }
            });
        }

    });
})
//处理前端分页查询操作
app.post("/getGoodsInfoByPage", function (req,res) {
    var pageNo=req.body.pageNo;
    var pageSize=req.body.pageSize;
    if(pageNo<0){
        pageNo=1;
    }
    if(pageSize<0){
        pageSize=7;
    }
    pool.getConnection(function (err,connection) {
        res.header("Content-Type","application/json");
            if(err){
            res.send('{"err":"0"}');
            console.log(err);
        }else { //0-7  1-7    (pageNo-1)*pageSize
            connection.query("select g.*,tname from goodsInfo g,goodstype t where g.tid=t.tid limit"+(pageNo-1)*pageSize+","+pageSize, function (err,result) {
                connection.release();
                if(err){
                    res.send('{"err":"0"}');
                    console.info(err);
                }else {
                    res.send(result);
                }
            });
        }

    });
});

app.post("/getGoodsInfoByPageOne", function (req,res) {
    var pageNo=req.body.pageNo;
    var pageSize=req.body.pageSize;
    if(pageNo<0){
        pageNo=1;
    }
    if(pageSize<0){
        pageSize=7;
    }
    pool.getConnection(function (err,connection) {
        res.header("Content-Type","application/json");
        if(err){
            res.send('{"err":"0"}');
            console.log(err);
        }else { //0-7  1-7    (pageNo-1)*pageSize
            connection.query("select g.*,tname from goodsInfo g,goodstype t where g.tid=t.tid limit"+(pageNo-1)*pageSize+","+pageSize, function (err,result) {
                if(err){
                    res.send('{"err":"0"}');
                    console.info(err);
                }else {
                    var obj={objs:result};
                    connection.query("select count(gid) as total from goodsInfo", function (err,result) {
                       connection.release();
                        var total=0;
                        if(err){
                            total=result[0].total;
                        }
                        obj.total=total;//{objs:[],total:9};  用一个对象创建它
                        res.send(obj);
                    });
                    res.send(result);
                }
            });
        }

    });
});




//使用静态中间件
app.use(express.static("page"))//默认到pages文件下查找静态资源

app.listen(8080, function (err) {
    if(err){
        console.info(err);
    }else {
        console.info("服务器启动成功");
    }
})