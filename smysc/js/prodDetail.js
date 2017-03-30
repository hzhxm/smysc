$(function(){
	$("#addtocart").click(function(){
		//$("body").on("click","#addtocart",function(){
		$.session.clear();
		userId = $.session.get('userId');
		if(userId != "-1" && userId)
		{
			$(".tocart").fadeIn();
			$("#goodsContent").hide();
			$("#home_menu").hide();
			$("#tocart_submit").show();
			$("#bynow_submit").hide();
			$("#overlayout").addClass("overlayout");
		}
		else {
			location.href="login.html?fr=4";
		}

	});

	//$("body").on("onclick",".close_button",function(){
	$("img.close_tocart").unbind("click").bind("click",function(){
		$(".tocart").fadeOut();
		$("#goodsContent").show();
		$("#home_menu").show();
		$("#tocart_submit").hide();
		$("#bynow_submit").hide();
		$("#overlayout").removeClass("overlayout");
	});
	//查看大图
	$("body").on("click","#productImg",function(){//可行
	//$("img.small_img").click(function(){
	//$("img.small_img").unbind("click").bind("click",function(){//可行
		$("#tocart_overlayout").addClass("tocart_overlayout");
		$(".tocart").hide();
		$(".container").hide();
		$(".fixed-foot").hide();
		$(".header").hide();
		$(".big_img").show();
	});

	//查看大图
	$("body").on("click",".big_img",function(){//可行
		//$("img.small_img").click(function(){
		//$("img.small_img").unbind("click").bind("click",function(){//可行
		$("#tocart_overlayout").removeClass("tocart_overlayout");
		$(".tocart").show();
		$(".container").show();
		$(".fixed-foot").show();
		$(".header").show();
		$(".big_img").hide();
	});

	$("#tocart_submit a").click(function(){
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

		$.ajax({
			type: 'post',
			async: true,
			url: 'action/productDetail.php',
//       contentType: false,    //不可缺
//      processData: false,    //不可缺
			data: {action: "addTocart", color: selected_color,size: selected_size,num: selected_num},
			dataType: "json",
			success: function (data, status) {
				//ajax 成功
				$(".tocart").fadeOut();
				$("#goodsContent").show();
				$("#home_menu").show();
				$("#tocart_submit").hide();
				$("#bynow_submit").hide();
				$("#overlayout").removeClass("overlayout");
				$("#totalNum").text(data.totalNum);
			},
			error: function (data, status, e) {
				console.log("系统异常" + data + e);
			},
			beforeSend: function (xhr) {
			}
		});
	});
	$("#bynow").click(function(){
		//$("body").on("click","#bynow",function(){
		$.session.clear();
		userId = $.session.get('userId');
		if(userId != "-1" && userId)
		{
			$(".tocart").fadeIn();
			$("#goodsContent").hide();
			$("#home_menu").hide();
			$("#tocart_submit").hide();
			$("#bynow_submit").show();
			$("#overlayout").addClass("overlayout");
		}
		else {
			location.href="login.html?fr=3";
		}
	});

	$("#bynow_submit a").click(function(){
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
			data: {action: "addToPay", color: selected_color,size: selected_size,num:selected_num,productId:productId,userId:userId},
			//dataType: "json",
			success: function (data, status) {
				//ajax 成功
				alert(data);
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



	$("body").on("click",".details_con ul li dd",function(e) {
		if (!$(this).hasClass('attr_sold_out')) {
			$(this).addClass('check').siblings().removeClass('check');
			//if($(this).parent("#tocart_colors")) {
				var selected_color = $("#tocart_colors").find(".check").text();
				var selected_size = $("#tocart_sizes").find(".check").text();
				$.ajax({
					type: 'post',
					async: true,
					url: 'action/productDetail.php',
//       contentType: false,    //不可缺
//      processData: false,    //不可缺
					data: {action: "getStockAndImage", color: selected_color,size: selected_size},
					dataType: "json",
					success: function (data, status) {
						//ajax 成功
						var stock = "库存" + data.productStock + "件";
						$("#productcount").text(stock);
						$("#productImg").attr("src", data.productImage);
					},
					error: function (data, status, e) {
						console.log("系统异常" + data + e);
					},
					beforeSend: function (xhr) {
					}
				});
			//}
		}
	});

	$("body").on("click",'.details_con ul li dd[class="check"]',function(){
		$(this).removeClass('check');
	});

	// 详情数量减少
	$('.details_con .minus,.cart_count .minus').click(function(){
		var _index=$(this).parent().parent().index()-1;
		var _count=$(this).parent().find('.count');
		var _val=_count.val();
		if(_val>1){
			_count.val(_val-1);
			$('.details_con .selected span').eq(_index).text(_val-1);
			
		}
		if(_val<=2){
			$(this).addClass('disabled');
		}
		
	});

	// 详情数量添加
	$('.details_con .add,.cart_count .add').click(function(){
		var _index=$(this).parent().parent().index()-1;
		var _count=$(this).parent().find('.count');
		var _val=_count.val();
		$(this).parent().find('.minus').removeClass('disabled');
		_count.val(_val-0+1);
		$('.details_con .selected span').eq(_index).text(_val-0+1);
		
	});

	//begin zjg modify
	ajaxgGtProductDetailFocus("productID");
	////详情属性选择
	//$('.details_con ul li dd').click(function(e) {
	//	clickChoose(this);
	//});
	//
	////处理默认选中的
	//$('.details_con ul li dd[class="check"]').each(function(){
	//	clickChoose(this);
	//});
	//end zjg modify

});


function set_tocart_details(data)
{
	$("#tocart_colors").empty().append(data.productColors);
	$("#tocart_sizes").empty().append(data.productSizes);
	var stock = "库存" + data.productStock + "件";
	$("#productcount").text(stock);
	$("#productImg").attr("src",data.productImage);
	var price = "¥" + data.productPrice;
	$("#price").text(price);

}

//获取属性值图片
function getPropValImgs(valId){
	 for(var i=0;i<propValueImgList.length;i++){
		  if(propValueImgList[i].valueId==valId){
			  var imgList = propValueImgList[i].imgList;
			  var str = "";
			  var strCounts = "";
			  for(var j=0;j<imgList.length;j++){

				  str+= '<li style="display: table-cell; vertical-align: middle; max-width: 768px;">';
				  //str+= '<a href="#"><img style="max-width:100vw;max-height:80vw;margin:auto;" src="'+photoPath+imgList[j]+'"></a>';
				  str+= '<a href="#"><img style="max-width:60vw;max-height:45vw;margin:auto;" src="'+photoPath+imgList[j]+'"></a>';
				  str+= '</li>';
				  
				  strCounts+= '<li></li>';
			  }
			  
			  $("#slide .tempWrap ul").html(str);
			  $("#slide .hd ul").html(strCounts);
			  
			//插件：图片轮播
			 TouchSlide({
			  	slideCell:"#slide",
			  	titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
			  	mainCell:".bd ul",
			  	effect:"left",
			  	autoPlay:true,//自动播放
			  	autoPage:true, //自动分页
			  	switchLoad:"_src" //切换加载，真实图片路径为"_src"
			  });

			  break;
		  }
	  }
}

//begin zjg add 

function set_focus_imgae(data){

	var imgList = data.focusImgList[0] ;
	//imgList[0] = data.image1 ;
	//imgList[1] = data.image2 ;
	//imgList[2] = data.image3 ;

	var str = "";
	var strCounts = "";
	for(var j=0;j<3;j++){

		str+= '<li style="display: table-cell; vertical-align: middle; max-width: 768px;">';
		//str+= '<a href="#"><img style="max-width:100vw;max-height:80vw;margin:auto;" src="'+imgList[j]+'"></a>';
		str+= '<a href="#"><img style="max-width:80vw;max-height:60vw;margin:auto;" src="'+imgList[j]+'"></a>';

		str+= '</li>';
		strCounts+= '<li></li>';
	}

	$("#slide .tempWrap ul").html(str);
	$("#slide .hd ul").html(strCounts);

	//插件：图片轮播
	TouchSlide({
		slideCell:"#slide",
		titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".bd ul",
		effect:"left",
		autoPlay:true,//自动播放
		autoPage:true, //自动分页
		switchLoad:"_src" //切换加载，真实图片路径为"_src"
	});
}


function setPro_detail_para_commment(data){

	var imgList = data.proDetailDes ; //商品详细信息的图片列表信息
	var para = data.proParameter ;    //商品参数的图片列表信息
	var comment =data.proComment ;    //商品评论信息列表


//<div class="prop-area" style="min-height:300px;overflow: hidden;">
//		<img src="img/8a009458-f5df-407c-95ca-c2ee81bffbc2.jpg" alt="" />
//		</div>
//
//
//
//		<div id="ajax_loading" style="margin: 10px  auto 15px;text-align:center;">
//		<img src="img/8d502712-32ed-4301-a4e7-45b1ea4aaa77.jpg" style="width: auto; display: block;  margin: auto;">
//		</div>
//		"#goodsContent .txt-imgs li"


	//详细信息处理
	var str = "";
	for(var j=0;j<imgList.length;j++){
		str+= '<div class="prop-area" style="min-height:300px;overflow: hidden;">' ;
		str+= '<img src="' +imgList[j]+ '"alt="" />  ' ;
		str+= ' </div> ' ;
	}
	$("#goodsContent .txt-imgs li").html(str);

	//商品参数处理
	str = "";
	for(var j=0;j<para.length;j++){
		str+= '<div id="ajax_loading" style="margin: 10px  auto 15px;text-align:center;">' ;
		str+= '<img src="' +para[j]+ '"  style="width: auto; display: block;  margin: auto;">  ' ;
		str+= ' </div> ' ;
	}
	$("#goodsContent .property li").html(str);


	//商品评论 ，需要重新配置CSS，这里先以图片处理
	str = "";
	str+= '<div id="ajax_loading">' ;

	for(var j=0;j<comment.length;j++){
		str+= '<div class="one-comment">';
		str+= '<div style="display: block; "><img src="images/self-tou.png" width="20px"><span>' + comment[j][0] + '</span>';//userID
		for (var k = 0;k < comment[j][5];k++)
		{
			str+= '<img src="images/b-iocn02.png" width="20px">' ;//user_star
		}
		str+= '</div>' ;
		//str+= '<div style="width: auto; display: block;  margin: auto;">' + comment[j][5] + '</div>' ;//user_star
		str+= '<div  style="display: block;">' + comment[j][2] + '<span>类型：' + comment[j][7] + '</span></div>' ;//user_comment_time  proColor proSize
		str+= '<div class="context" style="display: block;">' + comment[j][3] + '</div>' ;//user_comment
		str+= '<div  style="display: block;">掌柜回复：' + comment[j][4] + '</div>' ;//seller_comment
		//str+= '<div  style="display: block;">' + comment[j][5] + '</div>' ;//seller_comment_time
		str+= '</div>';

	}
	str+= ' </div> ' ;

	$("#goodsContent .appraise li").html(str);

}


function ajaxgGtProductDetailFocus(productID){
	//var c = $(object).text() ;
	$.ajax({
		type: 'post',
		async: true,
		url: 'action/productDetail.php?initProductDetail',
		data:{action:"initProductDetail"},
//       contentType: false,    //不可缺
//      processData: false,    //不可缺
		dataType: "json",
		success: function (data, status) {
			//ajax 成功
			//配置焦点图代码
			set_focus_imgae(data);
			set_tocart_details(data);
			$("#totalNum").text(data.totalNum);

			//配置商品详情 参数 评论
			setPro_detail_para_commment(data);
		},
		error: function (data, status, e) {
			console.log("系统异常" + data + e);
		},
		beforeSend: function(xhr){
		}
	});

}

//end zjg modify 

//选中属性
function clickChoose(object){
	//---------------------------------------------------------------------- 输出语句
	//console.debug("clickChoose 被调用到。");

	//ajaxgGtProductDetailFocus(object);

    if (!$(object).hasClass('attr_sold_out')) {
		$(object).addClass('check').siblings().removeClass('check');
    }

	var chooseCount = $(object).parents("li").attr("index");
	
    getSku($(object).attr("key"),chooseCount);
    
    //getPropValImgs($(object).attr("valId")); //获取属性图片
}

function getSelectedSkus(propIndex){
	var selectedLiList = [];
	  var selIndex = 0;
	  for(var h=0;h<=propIndex;h++){
		  if($("#choose_"+h+" .check").length!=0){
			  selectedLiList[selIndex]=$("#choose_"+h+" .check").get(0);
			  selIndex++;
		  }
	  }
	  
	  var index = 0;
	  var newSkus = [];
	  for(var i=0;i<skuDtoList.length;i++){
		  var has = true;
		  for(var j=0;j<selectedLiList.length;j++){
			  var kv = $(selectedLiList[j]).attr("key");
			  if(skuDtoList[i].properties.indexOf(kv)<0){
				  has = false;
				  break;
			  }
		  }
		  if(has){
			  newSkus[index]=skuDtoList[i];
			  index++;
		  }
	  }
	  return newSkus;
}

//获取sku
function getSku(kv,chooseIndex){
	//---------------------------------------------------------------------- 输出语句
	//console.debug("getsku 被调用到。kv:"+kv+"; chooseIndex:"+chooseIndex);
	
	propIndex = Number(chooseIndex);
	
	  var id = Number(propIndex);
	  while($("#choose_"+id).length!=0){
		  var aList = $("#choose_"+id+" dd").get();
		  for(var i=0;i<aList.length;i++){
			  var kv = $(aList[i]).attr("key");
			  var has = false;
			  var newSkus = getSelectedSkus(id-1);
			  for(var j=0;j<newSkus.length;j++){
				  if(newSkus[j].properties.indexOf(kv)>=0 && newSkus[j].status==1){
					  has = true;
					  break;
				  }
			  }
			  if(!has){
				  $(aList[i]).removeClass("check");
				  $(aList[i]).addClass("tb-out-of-stock");
			  }else{
				  $(aList[i]).removeClass("tb-out-of-stock");
			  }
		  }
		  id++;
	  }
	
	 $(".details_con ul li").removeClass("no-selected");
	
	var propLiCount = $("li[id^='choose_']").length;
	
	 if($(".check").length == propLiCount){
			var kvList = [];
			var checkList = $(".check").get();
			for(var k=0;k<checkList.length;k++){
				kvList[k]=$(checkList[k]).attr("key");
			}
			for(var i=0;i<skuDtoList.length;i++){
				var isT = true;
				for(var j=0;j<kvList.length;j++){
					if(skuDtoList[i].properties.indexOf(kvList[j])<0){
						isT = false;
						break;
					}
				}
				if(isT){
					//console.debug("选中的sku ："+ JSON.stringify(skuDtoList[i]));
					$("#currSkuId").val(skuDtoList[i].skuId);
					if(skuDtoList[i].name!=null && skuDtoList[i].name!=''){
						$("#prodName").html(skuDtoList[i].name);
					}else{
						$("#prodName").html(prodName);
					}
					
					var promotionPrice=Number(skuDtoList[i].amountDetail.promotionPrice);
					var cash=Number(skuDtoList[i].amountDetail.cash);
					if(promotionPrice<=cash){ //说明有折扣
						$("#prodCash").html(promotionPrice.toFixed(2));
					}else{
						$("#prodCash").html(cash.toFixed(2));
					}
					//$("#prodCash").html(skuDtoList[i].price.toFixed(2));
					break;
				}
			}
			allSelected=true;
		}else{
			//floatNotify.simple("请选中 属性！");
			var dlList = $("li[id^='choose_'] dl").get();
			for(var i=0;i<dlList.length;i++){
				if($(dlList[i]).find(".check").length==0){
					$(dlList[i]).parent().addClass("no-selected");
				}
			}
			allSelected = false;
		}
	  
}


//加入购物车
function addShopCart() {
	if (!allSelected) {//是否全部选中
		return;
	}
	var prodId = currProdId;//商品Id
	var prodCount = $("#prodCount").val();//购买数量
	jQuery.ajax({
		url : contextPath + "/addShopBuy",
		data : {
			"prodId" : prodId,
			"count" : prodCount,
			"sku_id" : $("#currSkuId").val(),
			"distUserName":distUserName
		},
		type : 'post',
		async : false, //默认为true 异步   
		dataType : 'json',
		error : function(data) {
		},
		success : function(retData) {
			if (retData.status == 'LESS') {
				floatNotify.simple(prodLessMsg);
			} else if (retData.status == 'OWNER') {
				floatNotify.simple(failedOwnerMsg);
			} else if (retData.status == 'MAX') {
				floatNotify.simple(failedBasketMaxMsg);
			} else if (retData.status == 'ERR') {
				floatNotify.simple(failedBasketErrorMsg);
			}else if (retData.status == 'NO_SHOP') {
				floatNotify.simple("商家不存在");
			}else if (retData.status == 'OFFLINE') {
				floatNotify.simple("该商品已经下线,不能购买！");
			}else if (retData.status == "OK") {
				floatNotify.simple("成功加入购物车！");
				var basketCount =  $("#totalNum").html();
				$("#totalNum").html(Number(basketCount)+Number(prodCount));
			}
		}
	});
}

//立即购买
function buyNow() {
	if (!allSelected) {//是否全部选中
		return;
	}
	var prodId = currProdId;
	var prodCount = $("#prodCount").val();//购买数量
	//var prodAttr = getProdAttr();
	jQuery.ajax({
		url : contextPath + "/addShopBuy",
		data : {
			"prodId" : prodId,
			"count" : prodCount,
			"sku_id" : $("#currSkuId").val(),
			"distUserName":distUserName
		},
		type : 'post',
		async : false, //默认为true 异步   
		dataType : 'json',
		error : function(data) {
		},
		success : function(retData) {
			if (retData.status == 'LESS') {
				floatNotify.simple(prodLessMsg);
			} else if (retData.status == 'OWNER') {
				floatNotify.simple(failedOwnerMsg);
			} else if (retData.status == 'MAX') {
				floatNotify.simple(failedBasketMaxMsg);
			} else if (retData.status == 'ERR') {
				floatNotify.simple(failedBasketErrorMsg);
			}else if (retData.status == 'NO_SHOP') {
				floatNotify.simple("商家不存在");
			}else if (retData.status == 'OFFLINE') {
				floatNotify.simple("该商品已经下线,不能购买！");
			}else if (retData.status == "OK") {
				window.location.href = contextPath+"/shopcart";
			}
		}
	});

}

/** 收藏商品 **/
function addInterest(obj,prodId){
	 var _this = $(obj);
	jQuery.ajax({
		url : contextPath + "/addInterest",
		data : {
			"prodId" : prodId
		},
		type : 'post',
		async : false, //默认为true 异步   
		dataType : 'json',
		error : function(data) {
		},
		success : function(retData) {
			floatNotify.simple(retData.message);
			if(retData.status == 1){
				//更换样式
				_this.find("i").addClass("i-fav-active");
			}
		}
	});
}

//获取参数页面
var paramResult;
function queryParameter(element,prodId){
	
	if(paramResult!=undefined){
		element.find('.desc-area').html(paramResult);
	}else{
		$.ajax({
			url: contextPath+"/queryDynamicParameter", 
			data: {"prodId":prodId},
			type:'post', 
			async : true, //默认为true 异步   
			error:function(data){
			},   
			success:function(data){
				paramResult=data;
				element.find('.desc-area').html(paramResult);
			}   
		});         
	}
	
	element.addClass('hadGoodsContent');
 }
 
//获取评论
function queryProdComment(element,prodId){
  var data = {
    "curPageNO": $("#prodCommentCurPageNO").val(),
	"prodId":prodId
  };
  jQuery.ajax({
	url:contextPath+"/comments",
	data: data,
	type:'post', 
	async : true, //默认为true 异步   
	error: function(jqXHR, textStatus, errorThrown) {
 		 //alert(textStatus, errorThrown);
	},
	success:function(result){
		element.html(result);
	}
  });
  element.addClass('hadGoodsContent');
}

//获取下一页评价
function next_comments(curPageNO,obj){
	var th = jQuery("#goodsContent .bd ul").eq(2);
	var page = parseInt(curPageNO)+1;
	var prodId = $("#prodId").val();
	var data = {
		    "curPageNO": page,
			"prodId":prodId
		};
	var _this = $(obj);
	jQuery.ajax({
		url:contextPath+"/comments",
		data: data,
		type:'post', 
		async : true, //默认为true 异步   
		error: function(jqXHR, textStatus, errorThrown) {
	 		 //alert(textStatus, errorThrown);
		},
		success:function(result){
			th.append(result);
			_this.remove();
		}
	  });
}