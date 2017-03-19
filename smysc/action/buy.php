<?php

//通用配置
require_once "../dbclass.php";
/*
$errstr = "no error";
$userId="1";
    $buylist="";
    $totalPrice=0;
    //连接数据库
    $db = new dbclass("jim");
    $connect = $db->sql_init();


    $sql = "select `product_images`.`product_image`,`orderlist`.`proColor`,`orderlist`.`proSize`,`orderlist`.`proNumber`,
            `product`.`product_title`,`product`.`product_price` from `product_images`
            left join `product` on `product`.`product_id` = `product_images`.`product_id`
            left join `orderlist` on `orderlist`.`proID` = `product`.`product_id`
            and `product_images`.`product_color` = `orderlist`.`proColor`
            where `orderlist`.`userID` =" . $userId . " and `orderlist`.`OrderState` = 'nowToPay'";

    $result = $db->my_query($connect, $sql);

    if ($result) {
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {


            $buylist .= "<div class=\"buy-list\">";
            $buylist .= "<ul>";
            $buylist .= "<a href=\"productDetails.html\">";
            $buylist .= "<figure>";
            $buylist .= "<img src=\"" . $row['product_image'] . "\"/>";
            $buylist .= "</figure>";
            $buylist .= "<li>";
            $buylist .= "<h3>" . $row['product_title'] . "</h3>";
            $buylist .= "<span>颜色：" . $row['proColor'] . "<br />";
            $buylist .= "尺寸：". $row['proSize'] . "</span>";
            $buylist .= "<b>￥" . $row['product_price'] . " </b>";
            $buylist .= "<small>×" . $row['proNumber'] . " </small>";
            $buylist .= "</li>";
            $buylist .= "</a>";
            $buylist .= "</ul>";
            $buylist .= "<dl>";
            $buylist .= "<dd>";
            $buylist .= "<span>运费</span>";
            $buylist .= "<small>包邮</small>";
            $buylist .= "</dd>";
            $buylist .= "<dd>";
            $buylist .= "<span>小计</span>";
            $buylist .= "<small>￥" . (intval($row['proNumber'])) * (intval($row['product_price'])) . "</small>";
            $buylist .= "</dd>";
            $buylist .= "<dt>";
            $buylist .= "<textarea rows=\"2\" placeholder=\"给卖家留言（50字以内）\"></textarea>";
            $buylist .= "</dt>";
            $buylist .= "</dl>";
            $buylist .= "</div>";

            $totalPrice += (intval($row['proNumber']) * intval($row['product_price']));
        }
    } else {
        $errstr = "error to query : " . mysqli_error($connect);
    }

    //echo $productlist ;
    //关闭数据库
    $db->close_connect($connect);
print_r($buylist);
print_r($totalPrice);
die;
*/

$action = $_POST['action'];

if($action == "initBuyDetail")
{
    $userId = $_POST['userId'];

    initBuyDetail($userId);
}

function initBuyDetail($userId){
    $errstr = "no error";
    $buylist="";
    $totalPrice=0;
    //连接数据库
    $db = new dbclass("jim");
    $connect = $db->sql_init();


    $sql = "select `product_images`.`product_image`,`orderlist`.`proColor`,`orderlist`.`proSize`,`orderlist`.`proNumber`,
            `product`.`product_title`,`product`.`product_price` from `product_images`
            left join `product` on `product`.`product_id` = `product_images`.`product_id`
            left join `orderlist` on `orderlist`.`proID` = `product`.`product_id`
            and `product_images`.`product_color` = `orderlist`.`proColor`
            where `orderlist`.`userID` =" . $userId . " and `orderlist`.`OrderState` = 'nowToPay'";

    $result = $db->my_query($connect, $sql);

    if ($result) {
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {


            $buylist .= "<div class=\"buy-list\">";
            $buylist .= "<ul>";
            $buylist .= "<a href=\"productDetails.html\">";
            $buylist .= "<figure>";
            $buylist .= "<img src=\"" . $row['product_image'] . "\"/>";
            $buylist .= "</figure>";
            $buylist .= "<li>";
            $buylist .= "<h3>" . $row['product_title'] . "</h3>";
            $buylist .= "<span>颜色：" . $row['proColor'] . "<br />";
            $buylist .= "尺寸：". $row['proSize'] . "</span>";
            $buylist .= "<b>￥" . $row['product_price'] . " </b>";
            $buylist .= "<small>×" . $row['proNumber'] . " </small>";
            $buylist .= "</li>";
            $buylist .= "</a>";
            $buylist .= "</ul>";
            $buylist .= "<dl>";
            $buylist .= "<dd>";
            $buylist .= "<span>运费</span>";
            $buylist .= "<small>包邮</small>";
            $buylist .= "</dd>";
            $buylist .= "<dd>";
            $buylist .= "<span>小计</span>";
            $buylist .= "<small>￥" . (intval($row['proNumber']) * intval($row['product_price'])) . "</small>";
            $buylist .= "</dd>";
            $buylist .= "<dt>";
            $buylist .= "<textarea rows=\"2\" placeholder=\"给卖家留言（50字以内）\"></textarea>";
            $buylist .= "</dt>";
            $buylist .= "</dl>";
            $buylist .= "</div>";

            $totalPrice += (intval($row['proNumber']) * intval($row['product_price']));
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
        "buylist" => $buylist,
        "totalPrice" => $totalPrice,
        "error" => $errstr,
    );
    echo json_encode($data);
}



?>
