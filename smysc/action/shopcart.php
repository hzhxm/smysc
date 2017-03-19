<?php

//通用配置
require_once "../dbclass.php";

$userId =  $_POST['userId'];//传进来的用户id
$productlist = "";//首页商品列表
$cartlist="";//购物车列表


//连接数据库
$db = new dbclass("jim");
$connect= $db->sql_init();

$userId =1;
//获取购物车列表
    $sql = "SELECT `SC`.`shopcart_id`,`SC`.`user_id`,`SC`.`product_id`,`SC`.`product_color`,`SC`.`product_size`,
              `SC`.`product_num`,`P`.`product_title`,`P`.`product_price`,`PT`.`product_image`
            FROM `shopcart_list` AS `SC`
            LEFT JOIN `product` AS `P` ON `P`.`product_id` = `SC`.`product_id`
            LEFT JOIN `product_type` AS `PT` ON `PT`.`product_id` = `SC`.`product_id` AND `PT`.`product_color` = `SC`.`product_color`
              AND `PT`.`product_size` = `SC`.`product_size`
            WHERE `SC`.`user_id` = " . $userId;
    $result = $db->my_query($connect,$sql);

    if($result){
//        $cartlist .= '<dl class="cart">';
//        $cartlist .= '<dt><label><input type="checkbox"/>全选</label>';
//        $cartlist .= '<a class="edit" id ="edit">编辑</a>';
//        $cartlist .= '</dt>';

        while ($row = $db->my_fetch_array($result,MYSQLI_BOTH)) {

            $cartlist .= '<dd>';
            $cartlist .= '<input type="checkbox" name="chkItem" value="'. $row['product_price'] . '"/>';
            $cartlist .= '<a href="productDetails.html" class="goodsPic"><img src="' . $row['product_image'] . '"/></a>';
            $cartlist .= '<div class="goodsInfor">';
            $cartlist .= '<h2><a href="productDetails.html">' . $row['product_title'] . '</a><span>' . $row['product_num'] . '</span></h2>';
            $cartlist .= '<div class="priceArea"><strong>' . $row['product_price'] . '</strong><del>' . $row['product_price'] . '</del></div>';
            $cartlist .= '<div class="numberWidget">';
            $cartlist .= '<input type="button" value="-" class="minus"/>';
            $cartlist .= '<input type="text" value="1" disabled class="number"/>';
            $cartlist .= '<input type="button" value="+" class="plus"/>';
            $cartlist .= '</div>';
            $cartlist .= '</div>';
            $cartlist .= '<a class="delBtn">删除</a>';
            $cartlist .= '<div style="clear:both;"></div>';
            $cartlist .= '</dd>';
        }
       // $cartlist .= '</dl>';
        //$cartlist .= '<div style="clear:both;"></div>';
    }else{
        echo "error to query : ".mysqli_error($connect);
    }


//关闭数据库
$db->close_connect($connect);

//配置ajax返回数据
 $data = array(
        "cartlist"=>$cartlist
 );
echo json_encode($data);

?>
