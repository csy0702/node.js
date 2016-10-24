create database friends character set utf8;
use friends;
create table userdata(
    userId int primary key auto_increment,
    userName varchar(50) not null unique,
    userPwd  varchar(50) not null,
    userBirth varchar(50) not null,
    userAddressA varchar(20) not null,
    userAddressB varchar(20) not null,
    userAddressC varchar(20) not null,
    userZt varchar(20) not null,
    userSg int not null,
    userSalary int not null,
    userSex varchar(20) not null,
    userXl varchar(50) not null,
    userEmail varchar(50) not null,
    userStatus int not null,
    userSchool varchar(100) not null,
    userJob varchar(100) not null
	userAge int not null,
    userIntroduce varchar(200),
    userImage varchar(2000),
    userPlace varchar(100),
    userBlood varchar(10),
    userAnimals varchar(10),
    userXz varchar(10),
    userA  varchar(100),
    userB  varchar(100),
    userC  varchar(100)
);

alter table userdata auto_increment=101;
create table friend(
    friendId int primary key auto_increment,
    fuserId int,
    friendotherId int,
    friendStatus  int not null,
    friendTime date not null,
    fvisitorSort int not null,
    friendRemark  varchar(100),
    friendA varchar(100),
    friendB varchar(100),
    friendC varchar(100)
);

alter table friend auto_increment=101;

create table active(
    activeId int primary key auto_increment,
    actName varchar(100) not null,
    actIntro varchar(200) not null,
    actstartTime date not null,
    actendTime date not null,
    actPlace varchar(100) not null,
    actImg varchar(250) not null,
    actPeople int not null,
    activeA  varchar(100),
    activeB  varchar(100),
    activeC  varchar(100)

);

alter table active auto_increment=101;

create table entry(
    entry int primary key auto_increment,
    eactiveId int,
    euserId int,
    entryTime date not null,
    entryA varchar(100),
    entryB varchar(100),
    entryC varchar(100)
);

alter table entry auto_increment=101;

create table word(
    wordId int primary key auto_increment,
    userId int,
    friendotherId int,
    wordContent varchar(255) not null,
    wordTime datetime not null,
    wordstatus int not null,
    wordA varchar(100),
    wordB varchar(100),
    wordC varchar(100)
);

alter table word auto_increment=101;

create table stroy(
    stroyId int primary key auto_increment,
    suserId int,
    stroyContent text not null,
    stroyTime date not null,
    stroyImg varchar(255) not null,
    stroyA varchar(100),
    stroyB varchar(100),
    stroyC varchar(100)
);

alter table stroy auto_increment=101;

alter table userdata modify userEmail varchar(50) not null unique;