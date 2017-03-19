<?php


$userId = 0;
$OrderState =  null;

//通用配置
require_once "../dbclass.php";
$orderlist = array(); //商品类型，列表信息

//$userId =  1001;
//$OrderState =  "all";

if($_POST['userId']&&$_POST['OrderState']){

    $userId =  $_POST['userId'];
    $OrderState =  $_POST['OrderState'];

    //连接数据库
    $db = new dbclass("jim");
    $connect= $db->sql_init();

    $ord = "Addtime desc" ; //desc asc
    $order = "order by $ord"; // 默认是时间倒叙排序

    //$limnit = "LIMIT 0 ,3" ;

    //获取category 列表信息
    if(strcasecmp($OrderState,"all")== 0){
        //忽略大小写比较
        $result = $db->my_query($connect,"SELECT * FROM orderlist WHERE userID='$userId' $order ");
    }else{
        $result = $db->my_query($connect,"SELECT * FROM orderlist WHERE userID='$userId' AND OrderState='$OrderState' $order ");
    }
    if($result){
        while ($row = $db->my_fetch_array($result,MYSQL_BOTH)) {
            array_push($orderlist,$row);
        }
    }else{
        echo "error to query : ".mysql_error();
    }
    //echo $productlist ;
    //关闭数据库
    $db->close_connect($connect);
}
//配置ajax返回数据
$data = array(
    "orderlist"=>$orderlist,
);
echo json_encode($data);

?>
