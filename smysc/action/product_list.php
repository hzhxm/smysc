<?php

require_once "../dbclass.php";
$order = "proID desc";
$proList =array();
$curPageNO=0;
$pageSize=0;
$rowNub=2;//default is 2

//<input type="hidden" id="curPageNO" name="curPageNO"  value=""/>
//			    <input type="hidden" id="pageSize" name="pageSize"  value="5"/>

    if (($_SERVER["REQUEST_METHOD"] == "POST") && (!empty($_POST["orders"])))
    {
        $order = $_POST["orders"];
        $curPageNO=intval($_POST["curPageNO"]);
        $pageSize=intval($_POST["pageSize"]);
        $rowNub=intval($_POST["rowNub"]);
        $curOffest=$curPageNO*$pageSize ;
        //连接数据库
        $db = new dbclass("jim");
        $connect= $db->sql_init();

//获取列表信息

        $result = $db->my_query($connect,"SELECT * FROM product_infomation order by $order  LIMIT $curOffest ,$pageSize");
        if($result){
            while ($row = $db->my_fetch_array($result,MYSQL_BOTH)) {
                array_push($proList,$row);
            }
        }else{
            echo "error to query : ".mysql_error();
        }

//echo $productlist ;
//关闭数据库
        $db->close_connect($connect);

    }



$data = array(
    "order"=> $order,
    "productlist"=> $proList,
    "curPageNO"=>$curPageNO,
    "pageSize"=>$pageSize,
    "curOffest"=>$curOffest,
    "rowNub"=>$rowNub,
);

echo json_encode($data);

exit;

?>
