/**
 * Created by zhengjinguo on 2017/2/7.
 */
$(function () {
    $.ajax({
        type: 'post',
        async: true,
        url: 'action/shopcart.php',
        data: {"userId":"1"},
        //data: {"userId":userId},
//       contentType: false,    //不可缺
//      processData: false,    //不可缺
        //data: datas,
        dataType: "json",
        success: function (data, status) {
            //ajax 成功
            //配置商品列表
            //alert(data.cartlist);
            cartlist(data);
        },

        error: function (data, status, e) {
            console.log("系统异常" + data + e);
        },

        beforeSend: function(xhr){

        }
    });

    function cartlist(data){
        if(!(data.cartlist)){
            return ;
        }
        //整个dl列表替换，dt上的"编辑"响应不了toggle事件？
        //$("#cartlist").html(data.cartlist);
        $("dd").hide();
        $("dl").append(data.cartlist);
    }

    $("#checkAll").click(function(){
        var checkState = $("#checkAll").is(':checked');
        $("[name = chkItem]:checkbox").attr("checked", checkState);

        var totalPrice = 0;
        var payList = $("input[name='chkItem']:checked").each(function () {
            var price = this.value;
            var num = $(this).siblings(".goodsInfor").find(".proNum").text();
            totalPrice = totalPrice + (parseInt(price) * parseInt(num)) ;
        });

        $(".btmNav a span").first().text(totalPrice);
    });


    $("body").on("click","[name = chkItem]:checkbox",function(){
        var totalPrice = parseInt($(".btmNav a span").first().text());
        var checkState = $(this).is(':checked');
        var price = this.value;
        var num = $(this).siblings(".goodsInfor").find(".proNum").text();
        if(checkState)
        {
            totalPrice = totalPrice + (parseInt(price) * parseInt(num)) ;
        }
        else
        {
            totalPrice = totalPrice - (parseInt(price) * parseInt(num)) ;
        }

        $(".btmNav a span").first().text(totalPrice);
    });

    $(".topay_submit").click(function () {
        var selected_size = $("#tocart_sizes").find(".check").text();
        if(selected_size == "" || selected_size == null)
        {
            alert("请选择尺寸! ");
            return;
        }

        var selected_color = $("#tocart_colors").find(".check").text();
        if(selected_color == "" || selected_color == null)
        {
            alert("请选择颜色! ");
            return;
        }

        var selected_num = $(".count").val();

        //location.href="buy.html?productId=1&selected_color=" + selected_color + "&selected_size=" + selected_size +
        //		"&selected_num=" + selected_num;

        var productId = 1;
        var userId = 1;

        $.ajax({
            type: 'post',
            async: true,
            url: 'action/productDetail.php',
//       contentType: false,    //不可缺
//      processData: false,    //不可缺
            data: {action: "addToPayFromShopCart", color: selected_color,size: selected_size,num:selected_num,productId:productId,userId:userId},
            //dataType: "json",
            success: function (data, status) {
                //ajax 成功
                if(data == "succeed")
                {
                    location.href="buy.html";
                }
            },
            error: function (data, status, e) {
                console.log("系统异常" + data + e);
            },
            beforeSend: function (xhr) {
            }
        });
    });

});