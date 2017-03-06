<?php

//通用配置
require_once "../dbclass.php";
$proTypeList = array(); //商品类型，列表信息
$brandTypeList = array(); //品牌类型，列表信息


//连接数据库
$db = new dbclass("jim");
$connect= $db->sql_init();



//获取category 列表信息
     $result = $db->my_query($connect,"SELECT categoryID,image,title FROM categoryInfo WHERE categoryInfo = 'product_type' ");
    if($result){
        while ($row = $db->my_fetch_array($result,MYSQL_BOTH)) {
            array_push($proTypeList,$row);
        }
    }else{
        echo "error to query : ".mysql_error();
    }


//var_dump(json_encode($proTypeList));
// exit ;

    $result = $db->my_query($connect,"SELECT categoryID,image FROM categoryInfo WHERE categoryInfo = 'brand_type' ");
    if($result){
        while ($row = $db->my_fetch_array($result,MYSQL_BOTH)) {
            array_push($brandTypeList,$row);
        }
    }else{
        echo "error to query : ".mysql_error();
    }



//echo $productlist ;
//关闭数据库
$db->close_connect($connect);

//配置ajax返回数据
 $data = array(
        "categoryProduct"=> $proTypeList  ,
        "categoryBrand"=>$brandTypeList,
 );

echo json_encode($data);

?>
