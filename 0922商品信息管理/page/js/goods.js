/**
 * Created by Administrator on 2016/9/23.
 */
$(function () {
    //显示商品的类型，在select的框中
    $.get("/getAllTypes",null, function (data) {//处理商品类型，请求商品类型的数据
        if(data.err){
           if(data.err=="0"){
               alert("数据库连接失败");
           }else if(data.err=="1"){
               alert("查询数据失败");
           }else {
               alert("获取数据失败");
           }
        }else {
            $.each(data, function (index,item) {
                $("#tid").append($("<option value='"+item.tid+"'>"+item.tname+"</option>"));
            });
        }
    })
});

function addGoods(){
    var tid = $.trim($("#tid").val());
    var pname = $.trim($("#pname").val());
    var price = $.trim($("#price").val());

    //发送异步请求到服务器
    $.ajaxFileUpload({
        url: "/addGoods",
        secureuri: false,//用于http协议
        fileElementId: "pic",//用于要上传的文本框的id
        data: {tid: tid, pname: pname, price: price},
        dataType: "json",
        succss: function (data, status) {
            data = $.trim(data);
            if (data == "1") {
                $("#tid").val("");
                $("#pname").val("");
                $("#price").val("");
                $("#pic").val("");
                $("#showpic").html("");
                alert("商品信息添加成功");
            } else {
                alert("商品信息添加失败");
            }
        },
        error: function (data, status, e) {
            alert(e);
        }
    });
}

function showGoodsInfo(){
    $.get("/getAllGoodsInfo", function (data) {
        var str;
        var pic;
        var pics;
        var picStr="";
        $.each(data, function (index,item) {
            picStr="";//没循环一次都把图片清空
            pic=item.pic;
            if(pic.indexOf(",")){
                pics=pic.split(",");//用，切割图片
                for(var i=0;i<pics.length;i++){
                    picStr+="<img src='../..'"+pic[i]+"' width='100px' height='100px'/>";
                }
            }else if(pic!=""){
                picStr+="<img src='../..'"+pic[i]+"' width='100px' height='100px'/>";
            }else {//没有图片

            }
            str="<tr><td>"+picStr+"</td><td>"+item.gid+"</td><td>"+item.gname+"</td><td>"+item.price+"</td><td>"+item.tname+"</td></tr>"
            $("#showGoodsInfo").append($(str));
        });
    },"json");
}