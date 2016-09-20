create database stusys character set utf8;

use stusys
--创建班级信息
create table classInfo(
    cid int primary key auto_increment,--班级编号
    cname varchar(100) not null unique,--班级名称
    status int --班级状态

);
--修改自增的起始值
alter table classInfo auto_increment=1001;


create table stuInfo(
    sid int primary key auto_increment,--学号
    sname varchar(100) not null unique,--姓名
    cid int,--所在班级编号
    sex varchar(4),--性别
    age int,
    pwd varchar(100),
    tel varchar(15)
);

--修改学号的开始值
alter table stuInfo auto_increment=10001;

--添加班级的初始数据    mysql中自增列用0代替
insert into classInfo values(0,"yc24",1);
insert into classInfo values(0,"yc23",1);
insert into classInfo values(0,"yc25",1);

insert into stuinfo values(0,"天天",1001,"男",20,"aaa","15096323172");