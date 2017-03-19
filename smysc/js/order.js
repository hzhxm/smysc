$(function () {

       var type = getType();
       if(checkType(type)){
           $(".ordertype").html(getTypeContent(type)); //配置title
           ajaxShowOrder(type);
       }else {
           $(".fixed-conta .order").html("");
           //floatNotify.simple("没有查询到订单");
       }
    }
)

function getType(){
    var s=location.search.substring(1);//这个就是页面?后面的内容，自己处理一下
    s=s.replace('type=','');
    return s;
}

function checkType(type){
   return ((type == "all") || (type == "waitForPay") || (type == "waitForGoods") || (type == "waitForReceive") || (type == "waitForComment")) ;
}

function ajaxShowOrder(t){
    $.ajax({
        type: 'post',
        async: true,
        url: 'action/order.php',
        data: {userId:1001,OrderState:t},
        dataType: "json",
        success: function (data, status) {
            showAllorder(data,t);
        },
        error: function (data, status, e) {
            console.log("系统异常" + data + e);
        },
        beforeSend: function (xhr) {
        }
    });
}

function  getTypeContent(type){

    var content = "全部订单" ;
    switch(type){

        case "all" :
            content = "全部订单"
            break;

        case "waitForPay" :
            content = "待付款"
            break;

        case "waitForGoods" :
            content = "待发货"
            break;

        case "waitForReceive" :
            content = "待收货"
            break;

        case "waitForComment" :
            content = "待评价"
            break ;

        default:
            break ;
    }
    return content ;
}
function  showAllorder(data,type)
{
    var str = "" ;
    var orderlist = data.orderlist ;

    for(var i=0;i<orderlist.length;i++){

        str  +=  '  <dl> <dt> ' ;
        str  +=  '  <time>'+ orderlist[i]['Addtime'] + '</time> ' ;
        str  +=  '  <span>'+getTypeContent(orderlist[i]['OrderState'])+'</span> </dt> <ul> ' ;
        str  +=  '   <a href="detail.html"> ' ;
        str  +=  ' <figure><img src="images/classify-ph03.png"/></figure> <li> ' ;
        str  +=  ' <p>超级大品牌服装，现在够级大品牌服装，现在够买只要998</p> ' ;
        str  +=  '  <small>'+ orderlist[i]['proColor'] + '</small> ' ;
        str  +=  '  <span>尺寸：'+ orderlist[i]['proSize'] + '</span> ' ;
        str  +=  ' <b>￥32.00</b> ' ;
        str  +=  '  <strong>×'+ orderlist[i]['proNumber'] + '</strong> </li>  </a> </ul> <dd><h3>商品总额</h3> ' ;
        str  +=  ' <i>￥98.00</i> </dd> <dd> ' ;

        str  +=   appendActionForOrderByType(orderlist[i]['OrderState']);

        str  +=     '</dd> </dl> ' ;
    }

    $(".fixed-conta .order").html(str);
}

//跟进订单状态返回需要显示的菜单
function appendActionForOrderByType(type) {
    var str = "";
    if (type == "waitForReceive") {
        str += '<input type="button" value="申请退款" class="order-que" /> ' ;
        str += '<input type="button" value="查看物流" onclick="javascript:location.href=wuliu.html" />' ;
        str += '    <a href="go-order.html">' ;
        str += '    <input type="button" value="订单详情" />  </a>' ;
        str += '    <input type="button" value="确认收货" class="order-que"/>' ;

    } else if (type == "waitForPay") {

        str += '<input type="button" value="去付款" class="order-que"/>' ;
        str += '    <a href="go-order.html">' ;
        str += '    <input type="button" value="订单详情" />  </a>' ;
        str += '    <input type="button" value="取消订单" />' ;

    } else if (type == "waitForGoods") {
        str += '<input type="button" value="申请退款" class="order-que"/>' ;
        str += '    <a href="go-order.html">' ;
        str += '    <input type="button" value="订单详情" />  </a>' ;
    }else{

    }
    return str ;
}