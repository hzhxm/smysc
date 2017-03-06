<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/23
 * Time: 10:25
 *
 *  连接sql数据库   sql_init ，返回连接
 *  数据库操作 （选择数据库select_db  ，创建数据库create_datebase，删除数据库 ，返回连接
 *  增删改查表格
 */


header("Content-Type: text/html; charset=utf-8");
mysql_query("SET NAMES UTF8");//默认UTF-8 字符
//DB name 
define('db_name',"smysc") ;

//Table name 
define('tb_hp_focusMap',"hp_focusMap") ;
define('tb_hp_shop_class',"hp_shop_class") ;
define('tb_hp_product_class',"hp_product_class") ;

//server parameter config
define('SERVER',"localhost") ;
define('DBUSER',"root") ;
define('DBPWD',"root") ;
define('SET_UTF8',"character set utf8");
define('SET_GBK',"  sa");

//if(!(isset($_POST["firstname"])&&$_POST["lastname"]&&$_POST["age"])){
//   exit;
//}

//connect to server
$connect = sql_init(SERVER,DBUSER,DBPWD);
select_db(db_name,$connect);

//mysql_query("SET NAMES UTF8");//默认UTF-8 字符
$result = mysql_query("SELECT image,url,summary FROM hp_focusMap ");

if($result){
    while ($row = mysql_fetch_array($result,MYSQL_BOTH)) {
        
        echo " $row[summary] : $row[image] , $row[url] ";  
        echo "</br>";  
    }
}else{
        echo "error to query : ".mysql_error();
}

echo "数据库操作"; 

//close to server
close_connect($connect);

//select_db(db_name,$connect);
// $sql = "INSERT INTO ".test_tb_name." (Firstname,Lastname,Age)
// VALUES ('jim','zheng','31')
// " ;


//$fistname = $_POST["firstname"];
//$lastname = $_POST["lastname"];
//$age =  $_POST["age"];
//
//$columns = "Firstname ,Lastname,Age" ;
//$value = "'$fistname','$lastname','$age'";

//insert_info(test_tb_name,$columns,$value,$connect);


//插入数据
//$tb_name,表名字
//$connect
//$columns 表示(column1, column2,...)
//$value,插入的数据内容，注意格式为 value1, value2 ，value3, value4 ,\注意要有单引号
//INSERT INTO table_name (column1, column2,...)
//VALUES (value1, value2,....)
//例子：
//$columns = "Firstname ,Lastname,Age" ;
//$value = "'$a','$a','$a'";
//insert_info(test_tb_name,$columns,$value,$connect);

function insert_info($tb_name,$columns, $value,$connect){

    $sql = "INSERT INTO ".$tb_name."  ($columns)"."VALUES ($value) " ;

    if(!mysql_query($sql,$connect)){
        die("insert info error  : ".mysql_error());
    }else{
        echo "$sql succeed !! \n" ;
    }
}


function creat_db_tb(){
    //do function 
    create_datebase(db_name,$connect);
    create_teble(db_name,tb_hp_focusMap,$connect);
    create_teble(db_name,tb_hp_shop_class,$connect);
    create_teble(db_name,tb_hp_product_class,$connect);
}


function sql_init($server,$user,$password){
    $con = mysql_connect($server,$user,$password);
    if(!$con){
        die("can not comnect : ".mysql_error());
    }else{
        //echo "connect succeed !!!" ;
    }
    return $con ;
}



function select_db($db_name,$conncet){

    if(!mysql_select_db($db_name,$conncet)){
        echo "select_db error : ".mysql_error();
        //exit;
    }
    return $conncet ;
}

//创建数据库  CREATE DATABASE database_name
function create_datebase($db_name,$con){
    if(mysql_query("CREATE DATABASE IF NOT EXISTS ".$db_name." ".SET_UTF8,$con)){
        echo "database created succeed !";
    }else{
        echo "error to create database : ".mysql_error();
    }
}

//在数据库里面创建表,同时设置主键
function create_teble($db_name,$tb,$conncet){
    mysql_select_db($db_name,$conncet);
    $sql = "CREATE TABLE IF NOT EXISTS $tb(
        image VARCHAR (150),
        url VARCHAR (150),
        summary VARCHAR (150)
    )";
    if(!mysql_query($sql,$conncet)){
        echo "create table $tb error : ".mysql_error();
    }else{
        echo "create table $tb succeed　！  ";
    }
}


//关闭数据库连接
function close_connect($connect){
    if($connect){
        mysql_close($connect);
    }
}


?>