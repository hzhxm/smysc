$(function () {

    $(window).load(function(){
        $(".loading").addClass("loader-chanage");
        $(".loading").fadeOut(300);
    });

    $.ajax({
        type: 'post',
        async: true,
        url: 'action/order.php',
//      contentType: false,    //不可缺
//      processData: false,    //不可缺
        data: {userId:1001,OrderState:"all"},
        dataType: "json",
        success: function (data, status) {
            test(data);

        },

        error: function (data, status, e) {
            console.log("系统异常" + data + e);
        },

        beforeSend: function (xhr) {

        }
    });

        function  test(data)
        {
           var str = "" ;
           var orderlist = data.orderlist ;

            for(var i=0;i<orderlist.length;i++){

                str  +=  '  <dl> <dt> ' ;
                str  +=  '  <time>'+ orderlist[i]['Addtime'] + '</time> ' ;
                str  +=  '  <span>待发货</span> </dt> <ul> ' ;
                str  +=  '   <a href="detail.html"> ' ;
                str  +=  ' <figure><img src="images/classify-ph03.png"/></figure> <li> ' ;
                str  +=  ' <p>超级大品牌服装，现在够级大品牌服装，现在够买只要998</p> ' ;
                str  +=  '  <small>'+ orderlist[i]['proColor'] + '</small> ' ;
                str  +=  '  <span>尺寸：'+ orderlist[i]['proSize'] + '</span> ' ;
                str  +=  ' <b>￥32.00</b> ' ;
                str  +=  '  <strong>×'+ orderlist[i]['proNumber'] + '</strong> </li>  </a> </ul> <dd><h3>商品总额</h3> ' ;
                str  +=  ' <i>￥98.00</i> </dd> <dd> ' ;
                str  +=  '  <input type="button" value="确认收货" class="order-que"/> ' ;
                str  +=  '  <input type="button" value="查看物流" onclick="javascript:location.href=wuliu.html" /> ' ;
                str  +=  '  <input type="button" value="取消订单" /> </dd> </dl> ' ;
            }

            $(".fixed-conta .order").html(str);
         }
    }

    )


