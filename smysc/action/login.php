<?php

//通用配置
require_once "../dbclass.php";

/*
$errstr = "no error";
$flag = false;
//连接数据库
$db = new dbclass("jim");
$connect = $db->sql_init();

$username = '333';
$password = 'zyx';

 $sql = "select * from `user_information`
            where (`userAccountName` ='" . $username . "' or `userMobile` = '" . $username . "') and `userPassword` = '" . $password . "'";

echo $sql;
    $result = $db->my_query($connect, $sql);

    if ($result) {
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
            $userid = $row["userID"];
            $flag = true;
        }

    } else {
        $errstr = "error to query : " . mysqli_error($connect);
    }

//echo $productlist ;
//关闭数据库
$db->close_connect($connect);

//$totalPrice = ((int)$productPrice) ;//* $num;
//配置ajax返回数据
$data = array(
    "flag" => $flag,
    "error" => $errstr,
);
echo json_encode($data);
die;
*/

$action = $_POST['action'];

if($action == "loginAuth")
{
    $username = $_POST['username'];
    $password = $_POST['password'];

    loginAuth($username,$password);
}
elseif($action == "registerUser")
{
    $username = $_POST['username'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];

    registerUser($username,$password,$phone);
}

function loginAuth($username,$password){
    $errstr = "no error";
    $userid = "-1";
    //连接数据库
    $db = new dbclass("jim");
    $connect = $db->sql_init();

    $sql = "select * from `user_information`
            where (`userAccountName` ='" . $username . "' or `userMobile` = '" . $username . "') and `userPassword` = '" . $password . "'";

    $result = $db->my_query($connect, $sql);

    if ($result) {
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
            $userid = $row["userID"];
        }

    } else {
        $errstr = "error to query : " . mysqli_error($connect);
    }

    //echo $productlist ;
    //关闭数据库
    $db->close_connect($connect);

    //$totalPrice = ((int)$productPrice) ;//* $num;
    //配置ajax返回数据
    $data = array(
        "userid" => $userid,
        "error" => $errstr,
    );
    echo json_encode($data);
}

function registerUser($username,$password,$phone){
    $errstr = "no error";
    $flag = false;
    //连接数据库
    $db = new dbclass("jim");
    $connect = $db->sql_init();


    $sql = "INSERT INTO `smysc`.`user_information` (`userLevel`,`userWechatNickName`,`userAccountName`,`userPassword`,
            `userMobile`,`UserPassportID`,`UserDescription`,`label`)
            VALUES(0,null,'". $username . "','" . $password . "','". $phone . "',null,null,null)";

    $result = $db->mysql_insert($connect, $sql);

    if ($result) {
        $flag = true;
    } else {
        $errstr = "error to insert : " . mysqli_error($connect);
    }

    //echo $productlist ;
    //关闭数据库
    $db->close_connect($connect);

    //$totalPrice = ((int)$productPrice) ;//* $num;
    //配置ajax返回数据
    $data = array(
        "flag" => $flag,
        "error" => $errstr,
    );
    echo json_encode($data);
}


?>
