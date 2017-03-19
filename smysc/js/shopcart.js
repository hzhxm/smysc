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
        $("[name = chkItem]:checkbox").attr("checked", true);
    });


});