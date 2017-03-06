<?php

//通用配置
require_once "../dbclass.php";
$imglist = array(); //焦点图返回的图片连接显示
$navigation = array(); //首页商品类
$productlist=array();//首页商品列表
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
        while ($row = $db->my_fetch_array($result,MYSQL_BOTH)) {
            array_push($imglist,$row);
        }
    }else{
        echo "error to query : ".mysql_error();
    }
}

//var_dump(json_encode($f));
// exit ;

//首页商品类处理（热门 精品 专题列表 品牌）
if($enbale_shopclass_customization) {
    $result = $db->my_query($connect,"SELECT image,url,summary FROM hp_shop_class ");
    if ($result) {
        while ($row = $db->my_fetch_array($result, MYSQL_BOTH)) {
            array_push($navigation,$row);
        }
    } else {
        echo "error to query : " . mysql_error();
    }
}


//首页显示商品列表
if($enbale_product_customization) {
    $result = $db->my_query($connect,"SELECT image,url,summary,yuanjia,zhehoujia FROM hp_product_class ");
    if ($result) {
        while ($row = $db->my_fetch_array($result,MYSQL_BOTH)) {
              array_push($productlist,$row);
        }
    } else {
        echo "error to query : " . mysql_error();
    }
}

//echo $productlist ;
//关闭数据库
$db->close_connect($connect);

//配置ajax返回数据
 $data = array(
        "imglist"=> $imglist  ,
        "navigation"=>$navigation,
        "productlist"=>$productlist,
 );
echo json_encode($data);

?>
