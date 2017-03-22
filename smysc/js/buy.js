/**
 * Created by zhengjinguo on 2017/3/11.
 */

$(function(){
    var userId=1;
    ajaxgGetBuyDetails(userId);

    $(".pay-submit").click(function(){
        $(".topay").fadeIn();
        $("#buy-info-overlayout").addClass("buy-info-overlayout");
        $("#buy-info-overlayout").css("position","fixed");
        $(".pay_price").text($("footer > p > b").text());
    });

    $(".pay_close").click(function () {
        $(".topay").fadeOut();
        $("#buy-info-overlayout").removeClass("buy-info-overlayout");
        $("#buy-info-overlayout").css("position","absolute");
    });
});

function ajaxgGetBuyDetails(userId){
    $.ajax({
        type: 'post',
        async: true,
        url: 'action/buy.php?initBuyDetail',
        data:{action:"initBuyDetail",userId:userId},
//       contentType: false,    //不可缺
//      processData: false,    //不可缺
        dataType: "json",
        success: function (data, status) {
            //ajax 成功
            //配置焦点图代码
            //set_address(data);
            set_buy_details(data);
            $("#totalPrice").text(data.totalPrice);
        },
        error: function (data, status, e) {
            console.log("系统异常" + data + e);
        },
        beforeSend: function(xhr){
        }
    });
}

function set_buy_details(data)
{
   // $("figure > img").attr("src",data.productImage);
    $(".to-buy").empty();
    $(".to-buy").append(data.buylist);
    $("footer > p > b").text("￥" + data.totalPrice);
}