/**
 * Created by Administrator on 2016/9/23.
 */
$(function () {
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
})