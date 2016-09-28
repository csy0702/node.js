/**
 * Created by Administrator on 2016/9/22.
 */
//绑定一个获焦事件
$(function () {
    $("#loginpages input").focus(function () {
        $(this).css("border-color","blue");
    });
    userIsLogin()//发送请求判断用户是否已经登录，及登录的话刷新的就自动的显示登录名
    showGoodsInfoByPge(1,7);
})

//后台分页  前端和后台一起分页  获取五页数据，但是显示只显示一页，就不会总是去发请求
//pageNo:查第几页
//pageSize:每页有多少条

function showGoodsInfoByPge(pageNo,pageSize){
    $.post("/getGoodsInfoByPage",{pageNo:pageNo,pageSize:pageSize},function(data){
        $.each(data, function (index,item) {
            var pic=item.pic;
            if(pic.indexOf(",")>0){
                pic=pic.split(",")[0];
            }else if(pic=="") {
                pic="images/素材.jpg";
            }

            var str='<li><dl><dt><img src="'+pic+'"/></dt><dd class="goods_price">商品价格:&yen;'+item.price
                +'</dd><dd>商品类型'+item.tname+'</dd></dl></li>';
            $("#goodsInfo").append($(str));
        });
        console.info(data);
    },"json");
}
function showLogin(){
    $("#uname").val("");
    $("#pwd").val("");
    $("#loginpages").mywin({left:"center",top:"60px"});
    $("#zcpages").hide();
    $(".bg").fadeIn("200","linear");//加一个背景层是它不能再点击了
}

//关闭层
function hidenloginpage(){
    $("#loginpages").hide();
    $(".bg").fadeOut();
}

//打开注册窗口
function showRegister(){
    $("#zcuname").val("");
    $("#zcpwd").val("");
    $("#zcpwdagain").val("");
    $("#zcpages").mywin({left:"center",top:"60px"});
    $("#loginpages").hide();
    $(".bg").fadeIn("200","linear");//加一个背景层是它不能再点击了
}

function hidenzcpage(){
    $("#zcpages").hide();
    $(".bg").fadeOut();
}
//用户注册

function userzc(){
    var uname= $.trim($("#zcuname").val());
    var pwd= $.trim($("#zcpwd").val());
    var pwdagain=$.trim($("#zcpwdagain").val());
    $.post("/userRegister",{uname:uname,pwd:pwd,pwdagain:pwdagain}, function (data) {
        data= $.trim(data);
        switch (data){
            case "1":$("#res").text("用户名不能为空。。");break;
            case "2":$("#res").text("密码不能为空。。");break;
            case "3":$("#res").text("两次密码不一致。。");break;
            case "4":$("#res").text("数据库连接失败。。");break;
            case "5":$("#res").text("数据库添加失败。。");break;
            case "6":$("#res").text("注册成功。。");hidenzcpage();
                break;
            default:$("#res").text("注册失败。。");break;
        }
    },"text");
}


//用户登录   失焦验证   前后端用同时校验
function userlogin(){
    //获取用户登录信息
    var uname= $.trim($("#uname").val());
    var pwd= $.trim($("#pwd").val());
    
    if(uname==""){
        $("#uname").css("border-color","red")
        return false;
    }
    if(pwd==""){
        $("#pwd").css("border-color","red")
        return false;
    }
    //发送请求到服务器进行校验
    $.post("/userLogin",{uname:uname,pwd:pwd}, function (data) {
        data= $.trim(data);
        switch (data){
            case "1":$("#uname").css("border-color","red");break;
            case "2":$("#pwd").css("border-color","red");break;
            case "3":alert("数据库连接失败");break;
            case "4":alert("数据库查询失败");break;
            case "5":alert("用户或密码错误");break;
            case "6":
                hidenloginpage();//关闭登录窗口
                var str='尊敬的会员：<a href="">['+uname+']</a>'
                str+='&nbsp;&nbsp;<a href="">[注销]</a>&nbsp;<a href="../back/goods.html">[后台管理]</a>';
                $("header").html(str);break;
            default:alert("登录失败");break;
        }
    });



}
//input标签失焦时，判断用户名是否被占用  信息验证
function checkinfos(obj,tabName,colName){
    var info=obj.value;
    if(info!=""){
        //发送请求到服务器看该用户名是否已经被注册
        $.get("/checkUserName",{uname:info,tabName:tabName,colName:colName}, function (data) {
            data= $.trim(data);
            if(data=="0"){
                $(obj).css("border-color","green");
                $(obj).next().eq(0).text("用户名验证成功").css("color","green");
            }else {
                $(obj).css("border-color","red");
                $(obj).next().eq(0).text("用户名已经被占用").css("color","red");
            }
        });
    }else {
        $(obj).css("border-color","red");
    }
}

//刷新判断用户是否已经登录

function userIsLogin(){
    $.get("/userIsLogin",null, function (data) {
        data= $.trim(data);
        var str;
        if(data!=0){
            str='尊敬的会员：<a href="">['+data+']</a>'
            str+='&nbsp;&nbsp;<a href="">[注销]</a>&nbsp;<a href="back/goods.html">[后台管理]</a>';

        }else {
           str=' <a href="javascript:showLogin()">[登录]</a><a href="javascript:showRegister()">[注册]</a>'
        }
        $("header").html(str);
    })
}
