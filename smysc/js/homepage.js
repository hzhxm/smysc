$(function () {

    ajaxForhomepageFocusAndnav();//焦点图和导航菜单的处理
    productlist_handle();//推荐的商品列表处理
});



function ajaxForhomepageFocusAndnav(){

    $.ajax({
        type: 'post',
        async: true,
        url: 'action/homepage.php',
        dataType: "json",
        success: function (data, status) {
            //ajax 成功
            //配置焦点图代码
            focusIcon(data);

            //配置导航栏
            nav_config(data);

            ////配置商品列表
           //productlist(data);
        },

        error: function (data, status, e) {
            console.log("系统异常" + data + e);
        },

        beforeSend: function(xhr){

        }
    });
}

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


//begin zjg add for product list form

function productlist_handle(){
    sendData();//加载第一次的默认数据
    registerReturnToTop();//注册返回顶部时间的效果
    registerScrollFunction();//注册滚轮的效果
    registerClickFunction();//注册每次点击提交表单
}

function sendData(){

    showFirstLoading();
    $("#list_form").ajaxForm().ajaxSubmit({
        success:function(result) {
            hideFirstAndAppendLoading();
            $(".item-list").html(getSortListInfo(result));
        },
        error:function(XMLHttpRequest, textStatus,errorThrown) {
            $("#container").html("");
            hideFirstAndAppendLoading();
            floatNotify.simple("查找失败");
            return false;
        }
        ,dataType: "json"
    })
}

function showFirstLoading(){
    $('#ajax_loading').show();
    $('#ajax_loading_append').hide();
}

function showAppendLoading(){
    $('#ajax_loading').hide();
    $('#ajax_loading_append').show();
}

function hideFirstAndAppendLoading(){
    $('#ajax_loading').hide();
    $('#ajax_loading_append').hide();
}


function appendData(){
    showAppendLoading();
    $("#list_form").ajaxForm().ajaxSubmit({
        success:function(result) {
            hideFirstAndAppendLoading();
            $(".item-list").append(getSortListInfo(result));
        },
        error:function(XMLHttpRequest, textStatus,errorThrown) {
            $("#container").html("");
            hideFirstAndAppendLoading();;
            floatNotify.simple("查找失败");
            return false;
        }
        , dataType: "json"
    });
}

/**判断是否为空**/
function isBlank(_value){
    if(_value==null || _value=="" || _value==undefined){
        return true;
    }
    return false;
}

function getSortListInfo(data) {
    var str = "";
    var productlist = data.productlist;
    if (productlist) {
        str += '<input type="hidden" id="ListTotal" value="3">';
        for (var i = 0; i < productlist.length; i++) {

            str += '<a href="views.html">';
            str += '	<div class="hproduct clearfix" style="background:#fff;border-top:0px;">';
            str += '		<div class="p-pic"><img style="max-height:100px;margin:auto;" class="img-responsive" src="img/' + productlist[i]['proPreviewImg'] + '"></div>';
            str += '		<div class="p-info">';
            str += '			<p class="p-title"> ' + productlist[i]['detaiTitle'] + '</p>';
            str += '			<p class="p-origin"><em class="price">¥' + productlist[i]['proSellPrice'] + '</em></p>';
            str += '			<p class="mb0"><del class="old-price">¥' + productlist[i]['proOriginalPrice'] + '</del></p>';

            str += '		</div>';
            str += '	</div>';
            str += '</a>';
        }
    }

    return str;
    //$(".item-list").html(str);
}


//返回顶部界面功能
function  registerReturnToTop(){
    $(".fanhui_cou").click(function(){
        $("body,html").animate({scrollTop:0},200);
        return false;
    });

    //返回顶部的渐出界面效果
    $(window).scroll(function(){
        if($(this).scrollTop()>300){
            $(".fanhui_cou").fadeIn(1500);

        }else{
            $(".fanhui_cou").fadeOut(1500);

        }
    });
}


//$(document).height() 代表了整个文档的高度
//$(this).scrollTop() 滚动条距离顶部距离
//$(this).height()  当前元素高度
function  registerScrollFunction() {
    $(window).scroll(function () {
        if ($(document).height() - $(this).scrollTop() - $(this).height() < 100) {

            var curPageNo = $("#curPageNO").val();
            if (isBlank(curPageNo) || curPageNo == 0) {
                curPageNo = 0;
            }

            curPageNo = parseInt(curPageNo) + 1;
            var totalPage = parseInt($("#ListTotal").val());
            if (curPageNo <= totalPage) {
                $("#curPageNO").val(curPageNo);
                appendData();
            }
        }
    });
}

//绑定 点击事件
function  registerClickFunction() {

    $(".row ul li").bind("click", function () {
        //begin zjg modify
        $(".item-list").html(" ");
        showFirstLoading();
        //end zjg modify


        var id = $(this).attr("id");
        var orderDir = "";
        $(".row ul li").each(function (i) {
            if (id != $(this).attr("id")) {
                $(this).removeClass("active"); //移除非当前点击的区域的 active 属性
            }
        });
        $(this).addClass("active"); //为当前点击的区域增加 active 属性
        var iElement = $(this).find("i");

        //根据点击区域，切换是升序或降序排序；
        //记录到i 的class ，
        //记录到变量 orderDir  排序的关键字
        if (id == 'cash') {
            if ($(iElement).hasClass("icon_sort_up")) {
                orderDir = "proSellPrice asc";
                $(iElement).attr("class", "icon_sort_down");

            } else if ($(iElement).hasClass("icon_sort_down")) {
                orderDir = "proSellPrice desc";
                $(iElement).attr("class", "icon_sort_up");

            } else {
                orderDir = "proSellPrice desc";
                $(iElement).attr("class", "icon_sort_up");
            }
        } else if (id == 'buys') {
            if ($(iElement).hasClass("icon_sort_down")) {
                orderDir = "proSoldVolume desc";
                $(iElement).attr("class", "icon_sort_up");

            } else if ($(iElement).hasClass("icon_sort_up")) {
                orderDir = "proSoldVolume asc";
                $(iElement).attr("class", "icon_sort_down");

            } else {
                orderDir = "proSoldVolume desc";
                $(iElement).attr("class", "icon_sort_up");
            }
        } else if (id == 'comments') {
            if ($(iElement).hasClass("icon_sort_down")) {
                orderDir = "proCommentNub desc";
                $(iElement).attr("class", "icon_sort_up");

            } else if ($(iElement).hasClass("icon_sort_up")) {
                orderDir = "proCommentNub asc";
                $(iElement).attr("class", "icon_sort_down");

            } else {
                orderDir = " proCommentNub desc";
                $(iElement).attr("class", "icon_sort_up");
            }
        } else if (id == 'default') {
            orderDir = "proId desc";
        }
        //给其他的i 的class 全部设置为icon_sort
        //siblings 找出所有当前兄弟级元素的集合？  siblings() 方法允许我们在 DOM 树中搜索这些元素的同胞元素，并用匹配元素构造一个新的 jQuery 对象
        $(this).siblings().find("i").attr("class", "icon_sort");

        $("#orders").val(orderDir);
        //获取到此ID 的值，trim 去掉字符串首尾空格
        var no_results = $.trim($("#no_results").html());
        if (no_results != "" && no_results != null && no_results != undefined) {
            return false;
        }
        $("#curPageNO").val(0);
        sendData();
    });
}

//end zjg add for product list form