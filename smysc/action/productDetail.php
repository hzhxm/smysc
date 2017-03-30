<?php

//通用配置
require_once "../dbclass.php";

/*
$errstr = "no error";
//连接数据库
$proParameter = array();
$db = new dbclass("jim");
$connect = $db->sql_init();
$productID =1;
$sql = "SELECT image FROM product_detailintroduce WHERE proID='" . $productID . "'  order by imageIdx";
$result = $db->my_query($connect, $sql);
echo $sql;
if($result){
    while ($row = $db->my_fetch_array($result,MYSQL_BOTH)) {
        //$proParameter=array($row['image1'],$row['image2'],$row['image3']);
        array_push($proParameter,$row["image"]);
    }
}else{
    $errstr = "error to query : " . mysqli_error($connect);
}
//}
$productID = 1;
$proComment = array();
//获取第三页商品评论详情
$sql = "SELECT * FROM `product_comment` WHERE proID='" . $productID . "'";
$result = $db->my_query($connect, $sql);
    if($result){
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
            //array_push($proComment, $row['description']);
            $comment = array($row["userID"],
                $row["user_comment"],
                $row["user_comment_time"],
                $row["seller_comment"],
                $row["seller_comment_time"],
                $row["user_star"],
                $row["user_comment_type"]);

            array_push($proComment, $comment);
        }
    } else {
        $errstr = "error to query : " . mysqli_error($connect);
    }


//echo $productlist ;
//关闭数据库
$db->close_connect($connect);

//配置ajax返回数据
$data = array(
    "proParameter" =>$proParameter ,
    "proComment" =>$proComment ,
    "error" => $errstr,
);
echo json_encode($data);
die;

*/

$action = $_POST['action'];

if($action == "initProductDetail")
{
    $userId=1;
    initProductDetail($userId);
}
else if($action == "getStockAndImage")
{
    $color = $_POST['color'];
    $size = $_POST['size'];

    getStockAndImage($color,$size);
}
else if($action == "addTocart")
{
    $color = $_POST['color'];
    $size = $_POST['size'];
    $num = $_POST['num'];

    addTocart($color,$size,$num);
}
else if($action =="addToPay")
{
    $color = $_POST['color'];
    $size = $_POST['size'];
    $num = $_POST['num'];
    $productId = $_POST['productId'];
    $userId = $_POST['userId'];

    addToPay($color,$size,$num,$productId,$userId);
}
function addToPay($color,$size,$num,$productId,$userId){
    $errstr = "no error";
    date_default_timezone_set("PRC");
    $curdate = date("Y-m-d H:i:s");
    $totalNum = 0;
    //连接数据库
    $db = new dbclass("jim");
    $connect = $db->sql_init();
    $sql = "insert into `orderlist` (`OrderState`,`proID`,`proColor`,`proSize`,`userID`,`proNumber`,`Addtime`)
      VALUES ('nowToPay',$productId,'$color','$size',$userId,'$num','$curdate')";

    $result = $db->mysql_insert($connect,$sql);

    if ($result) {
        echo "succeed" ;
    } else {
        $errstr = "error to insert : " . mysqli_error($connect);
    }

    //关闭数据库
    $db->close_connect($connect);
}
function addTocart($color,$size,$num){
    $userId = 2;
    $productID = 1;
    $errstr = "no error";
    $totalNum = 0;
    //连接数据库
    $db = new dbclass("jim");
    $connect = $db->sql_init();
    $sql = "insert into `shopcart_list` (`user_id`,`product_id`,`product_color`,`product_size`,`product_num`)
      VALUES ($userId,$productID,'$color','$size','$num')";

    $result = $db->mysql_insert($connect,$sql);

    if ($result) {
        //echo "succeed" ;
    } else {
        $errstr = "error to insert : " . mysqli_error($connect);
    }

    $sql = "select sum(`product_num`)  from `shopcart_list` WHERE `user_id`=".$userId;

    $result = $db->my_query($connect,$sql);

    if ($result) {
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
            $totalNum = $row[0];
        }
    } else {
        $errstr = "error to query : " . mysqli_error($connect);
    }


    //echo $productlist ;
    //关闭数据库
    $db->close_connect($connect);

    //配置ajax返回数据
    $data = array(
        "totalNum" => $totalNum,
        "error" => $errstr
    );
    echo json_encode($data);
}

function getStockAndImage($color,$size){
    $productID = 1;
    $productStock = 0;
    $errstr = "no error";

//连接数据库
    $db = new dbclass("jim");
    $connect = $db->sql_init();
    $sql = "select sum(`product_type`.`product_stock`) as stock,`product_images`.`product_image` from `product_images`
            left join `product_type` on `product_images`.`product_color` = `product_type`.`product_color`
            and `product_type`.`product_size` = '" . $size . "'
            and `product_type`.`product_id` = `product_images`.`product_id`
            where `product_images`.`product_id` =" . $productID . " and `product_images`.`product_color` = '" . $color .
            "' group by `product_type`.`product_color`,`product_images`.`product_image`";


    $result = $db->my_query($connect, $sql);

    if ($result) {
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
            $productImage = $row["product_image"];
            $productStock = $row["stock"]?$row["stock"]:"0";
        }
    } else {
        $errstr = "error to query : " . mysqli_error($connect);
    }


//echo $productlist ;
//关闭数据库
    $db->close_connect($connect);

//配置ajax返回数据
    $data = array(
        "productImage" => $productImage,
        "productStock" => $productStock,
        "error" => $errstr,
    );
    echo json_encode($data);
}


function initProductDetail($userId)
{
$color = "0";
$image1="1";
$image2 ="2";
$image3="3";
$focusImgList=array();
$proDetailDes=array() ;
$proParameter=array() ;
$proComment=array() ;


$errstr="no error";

//连接数据库
$db = new dbclass("jim");
$connect= $db->sql_init();

//$action=$_REQUEST['color'];

$action = "红色" ;
switch($action){

    case "红色":
        $color = "red";
        break ;

    case "黄色":
        $color = "yellow";
        break ;

    case "黑色":
        $color = "black";
        break ;
    default :
        $errstr="can not find the color : $action !!!";
        break;

}

//获取焦点图片列表
if($color){
        $result = $db->my_query($connect, "SELECT image1,image2,image3 FROM product_detail WHERE color='" . $color . "'");
    if($result){
            while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
//            $image1=  $row['image1'];
//            $image2 = $row['image2'];
//            $image3 = $row['image3'];
//            $focusImgList=array( $row['image1'], $row['image2'], $row['image3']);
            array_push($focusImgList,$row);
        }
    }else{
            $errstr = "error to query : " . mysqli_error($connect);
    }
}

$productID = 1 ;
//获取第一页商品介绍详情图片
//if($color){
    $sql = "SELECT image FROM product_detailintroduce WHERE proID='" . $productID . "'  order by imageIdx";
    $result = $db->my_query($connect, $sql);
    if($result){
            while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
            //$proDetailDes=array($row['image1'],$row['image2'],$row['image3']);
            array_push($proDetailDes,$row["image"]);
        }
    }else{
            $errstr = "error to query : " . mysqli_error($connect);
    }
//}

//获取第二页商品参数详情
//if($color){
       // $result = $db->my_query($connect, "SELECT image1,image2,image3 FROM proparameter WHERE proID='" . $productID . "'");
    $sql = "SELECT image FROM product_detailparameter WHERE proID='" . $productID . "'  order by imageIdx";
    $result = $db->my_query($connect, $sql);

    if($result){
        while ($row = $db->my_fetch_array($result,MYSQL_BOTH)) {
            //$proParameter=array($row['image1'],$row['image2'],$row['image3']);
            array_push($proParameter,$row["image"]);
        }
    }else{
            $errstr = "error to query : " . mysqli_error($connect);
    }
//}

//获取第三页商品评论详情
//if($color){
    $sql = "SELECT * FROM `product_comment` WHERE proID='" . $productID . "'";
    $result = $db->my_query($connect, $sql);
    if($result){
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
            //array_push($proComment, $row['description']);
            $comment = array($row["userID"],
                $row["user_comment"],
                $row["user_comment_time"],
                $row["seller_comment"],
                $row["seller_comment_time"],
                $row["user_star"],
                $row["user_comment_type"],
                $row["proColor"],
                $row["proSize"]);

            array_push($proComment, $comment);
        }
    } else {
            $errstr = "error to query : " . mysqli_error($connect);
        }
//    }

//获取商品库存情况
    $productColors = "";
    $productSizes = "";
    $productID = 1;
//$sql = "select `product_type`.`product_color`,`product_type`.`product_size`,`product_type`.`product_stock`,`product_color`.`product_image` from `product_type`
//left join `product_images` on `product_images`.`product_color` = `product_type`.`product_color` and `product_type`.`product_id` = `product_images`.`product_id`
//
//where `product_type`.`product_id` =" . $productID;
    $sql = "select `product_color` from `product_type` where `product_id` =" . $productID . " group by `product_color`";
    $result = $db->my_query($connect, $sql);
    $i = 0;
    $productImage = "";
    $productPrice = "";
    $productColorImage = "";
    $productStock = "";
    if ($result) {
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
            $check_flag = '';
            if ($i == 0) {
                $productColorImage = $row["product_color"];
                $check_flag = 'class="check"';
            }
            $i++;
            $productColors .= '<dd id="' . $row["product_color"] . '" ' . $check_flag . '>' . $row["product_color"] . '<span></span></dd>';
        }
    } else {
        $errstr = "error to query : " . mysqli_error($connect);
    }

    $sql = "select `product_size` from `product_type` where `product_id` =" . $productID . " group by `product_size`";
    $result = $db->my_query($connect, $sql);

    if ($result) {
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
            $productSizes .= '<dd id="' . $row["product_size"] . '" ' . $check_flag . '>' . $row["product_size"] . '<span></span></dd>';
        }
    } else {
        $errstr = "error to query : " . mysqli_error($connect);
    }

    $sql = "select sum(`product_type`.`product_stock`) as stock,`product_images`.`product_image`,`product`.`product_price` from `product_images`
            left join `product_type` on `product_images`.`product_color` = `product_type`.`product_color`
            and `product_type`.`product_id` = `product_images`.`product_id`
            LEFT JOIN `product` ON `product`.`product_id` = `product_images`.`product_id`
            where `product_images`.`product_id` =" . $productID . " and `product_images`.`product_color` = '" . $productColorImage . "'
            group by `product_type`.`product_color`,`product_images`.`product_image`";

    $result = $db->my_query($connect, $sql);

    if ($result) {
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
            $productImage = $row["product_image"];
            $productStock = $row["stock"];
            $productPrice = $row["product_price"];
        }
    } else {
        $errstr = "error to query : " . mysqli_error($connect);
    }

    $totalNum=0;
    $sql = "select sum(`product_num`)  from `shopcart_list` WHERE `user_id`=".$userId ;

    $result = $db->my_query($connect,$sql);

    if ($result) {
        while ($row = $db->my_fetch_array($result, MYSQLI_BOTH)) {
            $totalNum = $row[0];
        }
    } else {
        $errstr = "error to query : " . mysqli_error($connect);
    }
//echo $productlist ;
//关闭数据库
$db->close_connect($connect);

//配置ajax返回数据
 $data = array(

        "focusImgList"=>$focusImgList,
        "proDetailDes"=> $proDetailDes,
        "proParameter" =>$proParameter ,
        "proComment" =>$proComment ,
        "productColors" => $productColors,
        "productSizes" => $productSizes,
        "productImage" => $productImage,
        "productStock" => $productStock,
        "productPrice" => $productPrice,
        "totalNum" => $totalNum,
        "error" => $errstr,
    );
    echo json_encode($data);

}

?>
