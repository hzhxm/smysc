$(function () {


    productList_slide();
    $.ajax({
        type: 'post',
        async: true,
        url: 'action/homepage.php',
//       contentType: false,    //不可缺
//      processData: false,    //不可缺
        //data: datas,
        dataType: "json",
        success: function (data, status) {
            //ajax 成功
            //配置焦点图代码
            focusIcon(data);

            //配置导航栏
            nav_config(data);

            ////配置商品列表
            productlist(data);
        },

        error: function (data, status, e) {
            console.log("系统异常" + data + e);
        },

        beforeSend: function(xhr){

        }
    });


    /*首页  切换*/
    $(".sy-ul1 li").click(function(event) {
        var index1 = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $(".sy-qie .sy-qieul").eq(index1).show().siblings().hide();
    });

    function default_setting(){

        //默认焦点图显示，动态切换
        TouchSlide({
            slideCell:"#slide",
            titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell:".bd ul",
            effect:"leftLoop",
            autoPage:true,//自动分页
            autoPlay:true //自动播放
        });

    }

    function productList_slide(){

        //默认焦点图显示，动态切换
        TouchSlide({
            slideCell:"#hp_pl",
            titCell:".sy-info1 li", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell:".ssjg",
            effect:"leftLoop",
            autoPage:false,//自动分页
            autoPlay:false //自动播放
        });
    }

    function focusIcon(data){

        var str = "";
        var count = 0 ;
        var imglist = data.imglist ;
        if(!(imglist&&imglist.length)){
            default_setting();
            return ;
        }


        for(i=0;i<imglist.length;i++){
            str += '<li >';
            str += '<a href="'+ imglist[i]['url']+'"><img src="'+imglist[i]['image']+'"></a>';
            str += '</li>';
        }

        //配置焦点图代码
        $("#slide .tempWrap ul").html(str);
        $("#slide .hd ul").html(imglist.length);
        TouchSlide({
            slideCell:"#slide",
            titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell:".bd ul",
            effect:"leftLoop",
            autoPage:true,//自动分页
            autoPlay:true //自动播放
        });
    }

    function nav_config(data){
        var str = "" ;
        var nav = data.navigation ;
        if(!(nav)){
            return ;
        }

        for(var i = 0;i<nav.length;i++){
            str +=  '<a href="' + nav[i]['url'] + '" class="col-xs-3"><img src="' + nav[i]['image'] + '"class="img-responsive">';
            str += '<h4>' + nav[i]['summary'] + '</h4> </a>';
        }

        $(".category").html(str);

    }

    function productlist(data){
        //alert( $(".ssjg").html());
        //return ;
        var pl = data.productlist ;
        var str = "";

        if(!(pl)){
            return ;
        }

        for(var j = 0 ;j<=4 ;j++) {
//pl.length-j
            str += '<ul class="ssjg-ul1" style="display: table-cell; vertical-align: top; width: 345px;">' ;
            for(var i=0;i<pl.length-j;i++){
                str += '<li >';
                str += '<div class="ssjg-tu">';
                str += '<a href="'+pl[i]['url']+'#"> <img src = "'+pl[i]['image']+'"></a> </div>';

                str += '<h3><a href="'+pl[i]['url']+'#">'+pl[i]['summary']+'</a></h3>';
                str += '<dl class="ssjg-dl1">';
                str += '<dt>';
                str += '<p class="ssjg-p1">原价<span>'+pl[i]['yuanjia']+'</span></p>';
                str += '<p class="ssjg-p2">折后价<span>'+pl[i]['zhehoujia']+'</span></p>';
                str += '</dt>';
                str += '<dd><a href="'+pl[i]['url']+'#"><img src="images/sjsc-09.gif"></a></dd>';
                str += '<div style="clear:both;"></div>';
                str += '</dl>';
                str += '</li>';
            }
            //循环完成后执行
            str += '<div style="clear:both;"></div>';
            str += '</ul>';
        }

        $(".ssjg").html(str);
    }


});