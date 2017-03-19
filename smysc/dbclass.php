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
require_once "system/init.php" ;
class dbclass{

    private $user ; //连接或创建的账户
    public function __construct($user)    {
        $this->user = $user ;
    }

    function  my_query($connect,$str){
       return mysqli_query($connect,$str);
    }

    function  my_fetch_array($result,$f=MYSQLI_BOTH){
        return mysqli_fetch_array($result,$f=MYSQLI_BOTH);
    }
    function  my_error($connect){
        return mysqli_error($connect);
    }

function mysql_insert($connect,$sql){
    if(!mysqli_query($connect,$sql)){
        die("insert info error  : ".mysqli_error($connect));
    }else{
        return true;
    }
}
    //初始化并选择了db
    function sql_init($server=SERVER,$user=DBUSER,$password=DBPWD,$db=db_name){

        $con = mysqli_connect($server,$user,$password);

        if(!$con){
            die("can not comnect : ".mysqli_error());
        }else{
            //echo "connect succeed !!!" ;
        }
        $con = $this->select_db(db_name,$con);
        mysqli_query($con,"SET NAMES UTF8");//默认UTF-8 字符
        return $con ;
    }


    //关闭数据库连接
    function close_connect($connect){
        if($connect){
            mysqli_close($connect);
        }
    }


        function select_db($db_name,$conncet){

        if(!mysqli_select_db($conncet,$db_name)){
            echo "select_db error : ".mysqli_error();
            //exit;
        }
        return $conncet ;
    }

//
//    function example(){
//
//        //connect to server
//        $connect = sql_init();
//
//        $result = mysql_query("SELECT image,url,summary FROM hp_focusMap ");
//        if($result){
//            while ($row = mysql_fetch_array($result,MYSQL_BOTH)) {
//                echo " $row[summary] : $row[image] , $row[url] ";
//                echo "</br>";
//            }
//        }else{
//            echo "error to query : ".mysqli_error($connect);
//        }
//        echo "数据库操作";
//        //close to server
//        close_connect($connect);
//    }
//

//
//    function insert_info($tb_name,$columns, $value,$connect){
//
//        $sql = "INSERT INTO ".$tb_name."  ($columns)"."VALUES ($value) " ;
//
//        if(!mysqli_query($connect,$sql)){
//            die("insert info error  : ".mysqli_error($connect));
//        }else{
//            echo "$sql succeed !! \n" ;
//        }
//    }
//
//    function mysql_insert($connect,$sql){
//        if(!mysqli_query($connect,$sql)){
//            die("insert info error  : ".mysqli_error($connect));
//        }else{
//            echo "$sql succeed !! \n" ;
//        }
//    }
//
//
//    function creat_db_tb($connect){
//        //do function
//        create_datebase(db_name,$connect);
//        create_teble(db_name,tb_hp_focusMap,$connect);
//        create_teble(db_name,tb_hp_shop_class,$connect);
//        create_teble(db_name,tb_hp_product_class,$connect);
//    }
//
//

//
////创建数据库  CREATE DATABASE database_name
//    function create_datebase($db_name,$con){
//        if(mysql_query("CREATE DATABASE IF NOT EXISTS ".$db_name." ".SET_UTF8,$con)){
//            echo "database created succeed !";
//        }else{
//            echo "error to create database : ".mysqli_error($con);
//        }
//    }
//
////在数据库里面创建表,同时设置主键
//    function create_teble($db_name,$tb,$conncet){
//        mysql_select_db($db_name,$conncet);
//        $sql = "CREATE TABLE IF NOT EXISTS $tb(
//        image VARCHAR (150),
//        url VARCHAR (150),
//        summary VARCHAR (150)
//    )";
//        if(!mysql_query($sql,$conncet)){
//            echo "create table $tb error : ".mysqli_error($connect);
//        }else{
//            echo "create table $tb succeed　！  ";
//        }
//    }

}

?>