<?php

//通用配置
require_once "../dbclass.php";

$action=$_POST['action'];

if($action == "initIndexPage")
{
    $userId=$_POST['userid'];
    initIndexPage($userId);
}
else if($action == "clearSearchList")
{
    $userId=$_POST['userid'];
    clearSearchList($userId);
}

function clearSearchList($userId){
    //连接数据库
    $db = new dbclass("jim");
    $connect= $db->sql_init();

    $flag=false;

    $sql="update `searchContent` set `displayFlag`=0 WHERE `userID`=" . $userId;
    $result = $db->my_query($connect,$sql);
    if ($result) {
       $flag = true;
    } else {
        echo "error to query : " . mysqli_error();
    }


    //echo $productlist ;
    //关闭数据库
    $db->close_connect($connect);

    //配置ajax返回数据
    $data = array(
        "flag"=> $flag,
    );
    echo json_encode($data);
}

function initIndexPage($userId)
{
    $imglist = array(); //焦点图返回的图片连接显示
    $navigation = array(); //首页商品类
    $productlist=array();//首页商品列表
    $usersearchlist=array();//用户搜索列表
    $hotsearchlist=array();//热门搜索列表
    $enbale_foucus_customization = true ;
    $enbale_shopclass_customization = true ;
    $enbale_product_customization = true ;

    //连接数据库
    $db = new dbclass("jim");
    $connect= $db->sql_init();


    //首页焦点图处理函数
    if($enbale_foucus_customization){
         $result = $db->my_query($connect,"SELECT image,url,summary FROM hp_focusMap ");
        if($result){
            while ($row = $db->my_fetch_array($result,MYSQLI_BOTH)) {
                array_push($imglist,$row);
            }
        }else{
            echo "error to query : ".mysqli_error();
        }
    }

    //var_dump(json_encode($f));
    // exit ;

    //首页商品类处理（热门 精品 专题列表 品牌）
    if($enbale_shopclass_customization) {
        $result = $db->my_query($connect,"SELECT image,url,summary FROM hp_shop_class ");
        if ($result) {
            while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
                array_push($navigation,$row);
            }
        } else {
            echo "error to query : " . mysqli_error();
        }
    }


    //首页显示商品列表
    if($enbale_product_customization) {
        $result = $db->my_query($connect,"SELECT image,url,summary,yuanjia,zhehoujia FROM hp_product_class ");
        if ($result) {
            while ($row = $db->my_fetch_array($result,MYSQLI_BOTH)) {
                  array_push($productlist,$row);
            }
        } else {
            echo "error to query : " . mysqli_error();
        }
    }

    //用户搜索列表
    if($userId != "-1") {
        $sql="SELECT `searchContent` FROM `user_search_list`
                              WHERE `userID` = " . $userId . " ORDER BY searchTime desc limit 0,10";
        $result = $db->my_query($connect, $sql);
        if ($result) {
            while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
                array_push($usersearchlist, $row["searchContent"]);
            }
        } else {
            echo "error to query : " . mysqli_error();
        }
    }

    //用户搜索列表
    $result = $db->my_query($connect,"SELECT `searchContent` FROM `user_search_list` ORDER BY searchTime desc limit 0,10");
    if ($result) {
        while ($row = $db->my_fetch_array($result,MYSQLI_BOTH)) {
            array_push($hotsearchlist,$row["searchContent"]);
        }
    } else {
        echo "error to query : " . mysqli_error();
    }


    //echo $productlist ;
    //关闭数据库
    $db->close_connect($connect);

    //配置ajax返回数据
     $data = array(
            "imglist"=> $imglist  ,
            "navigation"=>$navigation,
            "productlist"=>$productlist,
            "usersearchlist"=>$usersearchlist,
            "hotsearchlist"=>$hotsearchlist,
     );
    echo json_encode($data);
}
?>
