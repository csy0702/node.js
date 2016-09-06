/**
 * Created by Administrator on 2016/8/29.
 */
/**
 * Created by Administrator on 2016/8/29.
 */
//js中跳出循环
/*for(var i=0;i<10;i++){
    for(var j=1;j<5;j++){
        if(i*j==15){
            break;
        }
        console.info(i+"   "+j);
    }
    console.info(i);
}*/

 var req={
 session:{
 user:{
 name:'csy',
 age:20
 }
 }
 }
 console.info(req.session.user.name);

 with(req.session.user){
 console.info(name+"   "+age);
 }

