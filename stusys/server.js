/**
 * Created by Administrator on 2016/9/7.
 */

var http=require("http");
var mysql=require("mysql");
var querystring=require("querystring");
var fs=require("fs");
var url=require("url");

var server=http.createServer().listen(1111, function () {
    console.info("服务器已经启动。。。");
});

var pool=mysql.createPool({//创建连接池
    host:"127.0.0.1",
    port:3306,
    database:"stusys",
    user:"root",
    password:"279293",
    connectionLimit:20,
    queueLimit:10
});

server.on("request", function (req,res) {
    if(req.url!="/favation.ico"){
        var urlobj=url.parse(req.url);//将url变成一个json对象
        var path=urlobj.pathname;
        console.info(path);
        if(path=="/"){
            readFile("login.html",res);
        }else if(path=="/getAllClassInfo"){//获取所有的班级
            pool.getConnection(function (err,connection) {
                if(err){
                    res.writeHead(200,"ok",{"Content-type":"text/json"});
                    res.write({"code":0});
                    res.end();

                }else {
                    connection.query("select * from classInfo order by cid asc", function (err,rows) {
                        if(err){
                            res.write({"code":1});
                            res.end();
                        }else {
                            res.write(JSON.stringify(rows));
                            res.end();
                        }
                    });

                }
            });
        }else if(path=="/adduser"){//说明是学生注册
            //因为使用的是post传输，所以
            //获取到页面注册的信息
            req.on("data", function (data) {
                var dataInfo=querystring.parse(data.toString());//将请求的数据转换成json格式
                if(dataInfo.sex==""){
                   res.write("2");
                   res.end();
                }else {
                    dataInfo["sid"]=0;//添加一条信息
                    //将用户提交的注册信息存入数据库
                    pool.getConnection(function (err,connection) {
                        if(err){
                            res.write("0");
                            res.end();
                        }else {
                            console.info(dataInfo);
                            connection.query("insert into stuInfo set ?",dataInfo, function (err,result) {
                                if(err){
                                    res.write("1");
                                }else {
                                    res.write(result.insertId+"");//响应的信息

                                }
                                res.end();
                                connection.release();
                            });
                        }
                    });
                }

            })
        }else if(path=="/userLogin"){//学生登录
            //有学好和密码传送过来，要进行监听，将页面中的学号和密码与数据库中查询到的进行校验，看是否正确
            req.on("data", function (data) {
                var dataInfo=querystring.parse(data.toString());//将请求的数据转换成json格式
                if(dataInfo.sid==""){//学号为空。回送一个数据
                    res.write("1");
                    res.end();
                }else if(dataInfo.pwd==""){//密码为空，会送一个数据
                    res.write("2");
                    res.end();
                }else {//学号和密码都不为空，就与数据库中数据进行比对
                    pool.getConnection(function (err,connection) {
                        if(err){
                            res.write("3");//数据库连接失败
                            res.end();
                        }else {
                            connection.query("select * from stuInfo where sid=? and pwd=?",[dataInfo.sid,dataInfo.pwd], function (err,result) {
                                if(err){
                                    res.write("4");//查询数据库失败
                                }else {
                                   if(result.length==0){//说明学号和密码错误
                                       res.write("0");
                                   }else {//登录成功
                                       res.write("5");
                                   }
                                }
                                res.end();//回送结束
                            })
                        }
                    })
                }
            })
        }else if(path=="/findAllStuInfo"){//查询班级所有信息
            pool.getConnection(function (err,connection) {
                if(err){
                    res.writeHead(500,"error",{"Contecnt-type":"text/json"});
                    res.write('{code:"0"}');
                    res.end();
                }else {
                    connection.query("select s.*,cname from stuInfo s inner join classInfo c on s.cid=c.cid", function (err,result) {
                        if(err){
                            res.writeHead(500,"error",{"Contecnt-type":"text/json"});
                            res.write('{code:"1"}');

                        }else {
                            res.writeHead(200,"ok",{"Contecnt-type":"text/json"});
                            res.write(JSON.stringify(result));
                        }
                        res.end();
                    })

                }
            })
        }else {
            readFile("."+path,res);
        }
    }else {
        res.end();
    }
});
//读取指定路径的文件
function readFile(path,res){
    fs.exists(path,function(exists){
        if(exists){//判断文件是否存在
            var file=fs.createReadStream(path);
            file.on("data", function (data) {
                res.write(data);
            });
            file.on("end", function () {
                res.end();
            });
        }else {
            res.writeHead(404,"not found",{"Content-type":"text/html;charset=utf-8"});
            res.write("<h1>404页面找不到</h1>");
            res.end();
        }
    });

}

