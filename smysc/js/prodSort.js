jQuery(document).ready(function() {
	
	sendData();//一过来就调用

	//返回顶部的渐出界面效果
	$(window).scroll(function(){
		if($(this).scrollTop()>300){
			$(".fanhui_cou").fadeIn(1500);
			
		}else{
			$(".fanhui_cou").fadeOut(1500);
			
		}
	});
	//返回顶部界面功能
	$(".fanhui_cou").click(function(){
		$("body,html").animate({scrollTop:0},200);
		return false;
	});

	//$(document).height() 代表了整个文档的高度
	//$(this).scrollTop() 滚动条距离顶部距离
	//$(this).height()  当前元素高度
	$(window).scroll(function(){
        if ($(document).height() - $(this).scrollTop() - $(this).height()<100){

        	var curPageNo = $("#curPageNO").val();
        	if(isBlank(curPageNo) || curPageNo == 0){
        		curPageNo = 0;
        	}
        	
        	curPageNo=parseInt(curPageNo)+1;
			var totalPage=parseInt($("#ListTotal").val());
			if(curPageNo<=totalPage){
				$("#curPageNO").val(curPageNo);
				appendData();
			}
        }
    });
	
	
	//绑定 点击事件
	$(".row ul li").bind("click",function() {

		//begin zjg modify
		$(".item-list").html(" ");
		$('#ajax_loading').show();
		//end zjg modify


		var id = $(this).attr("id");
		var orderDir = "";
		$(".row ul li").each(function(i) {
			if (id != $(this).attr("id")) {
				$(this).removeClass("active"); //移除非当前点击的区域的 active 属性
			}
		});
		$(this).addClass("active"); //为当前点击的区域增加 active 属性
		var iElement=$(this).find("i");

		//根据点击区域，切换是升序或降序排序；
		//记录到i 的class ，
		//记录到变量 orderDir  排序的关键字
		if (id == 'cash') {
			if ($(iElement).hasClass("icon_sort_up")) {
				orderDir = "proSellPrice asc";
				$(iElement).attr("class","icon_sort_down");
				
			} else if($(iElement).hasClass("icon_sort_down")){
				orderDir = "proSellPrice desc";
				$(iElement).attr("class","icon_sort_up");
				
			}else{
				orderDir = "proSellPrice desc";
				$(iElement).attr("class","icon_sort_up");
			}
		} else if (id == 'buys') {
			if ($(iElement).hasClass("icon_sort_down")) {
				orderDir = "proSoldVolume desc";
				$(iElement).attr("class","icon_sort_up");
				
			} else if($(iElement).hasClass("icon_sort_up")){
				orderDir = "proSoldVolume asc";
				$(iElement).attr("class","icon_sort_down");
				
			}else{
				orderDir = "proSoldVolume desc";
				$(iElement).attr("class","icon_sort_up");
			}
		} else if (id == 'comments') {
			if ($(iElement).hasClass("icon_sort_down")) {
				orderDir = "proCommentNub desc";
				$(iElement).attr("class","icon_sort_up");
				
			} else if($(iElement).hasClass("icon_sort_up")){
				orderDir = "proCommentNub asc";
				$(iElement).attr("class","icon_sort_down");
				
			}else{
				orderDir = " proCommentNub desc";
				$(iElement).attr("class","icon_sort_up");
			}
		} else if (id == 'default') {
			orderDir = "proId desc";
		}
		//给其他的i 的class 全部设置为icon_sort
		//siblings 找出所有当前兄弟级元素的集合？  siblings() 方法允许我们在 DOM 树中搜索这些元素的同胞元素，并用匹配元素构造一个新的 jQuery 对象
		$(this).siblings().find("i").attr("class","icon_sort");
		
		$("#orders").val(orderDir);
		//获取到此ID 的值，trim 去掉字符串首尾空格
		var no_results=$.trim($("#no_results").html());
		if(no_results!="" && no_results!=null && no_results!=undefined){
			return false;
		}
		$("#curPageNO").val(0);
		sendData();
	});
});

function sendData(){
	$('#ajax_loading').show();
	$("#list_form").ajaxForm().ajaxSubmit({
		  success:function(result) {
			 $('#ajax_loading').hide();
			 //$("#container").html(result);
			  $(".item-list").html(getSortListInfo(result));
		   },

		error:function(XMLHttpRequest, textStatus,errorThrown) {
			 $("#container").html("");
			 $('#ajax_loading').hide();
			 floatNotify.simple("查找失败");
			 return false;
		  }

		  ,dataType: "json"
	})
}

function appendData(){
	$('#ajax_loading').show();
	$("#list_form").ajaxForm().ajaxSubmit({
		  success:function(result) {
			 $('#ajax_loading').hide();
			 //$("#container").append(result);
			  $(".item-list").append(getSortListInfo(result));
		   },
		   error:function(XMLHttpRequest, textStatus,errorThrown) {
			 $("#container").html(""); 
			 $('#ajax_loading').hide();
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

function getSortListInfo(data){
	var str = "" ;
	var productlist=data.productlist ;
	if(productlist){
		str += '<input type="hidden" id="ListTotal" value="3">';
		for(var i=0;i<productlist.length;i++){

			str += '<a href="views.html">';
			str += '	<div class="hproduct clearfix" style="background:#fff;border-top:0px;">';
			str += '		<div class="p-pic"><img style="max-height:100px;margin:auto;" class="img-responsive" src="img/'+ productlist[i]['proPreviewImg'] + '"></div>';
			str += '		<div class="p-info">';
			str += '			<p class="p-title"> '+ productlist[i]['detaiTitle'] + '</p>';
			str += '			<p class="p-origin"><em class="price">¥'+ productlist[i]['proSellPrice'] +'</em></p>';
			str += '			<p class="mb0"><del class="old-price">¥'+ productlist[i]['proOriginalPrice'] +'</del></p>';

			//begin for test code
			//str +=  '<p class="p-title"> proID = '+ productlist[i]['proID'] + '</p>';
			//str +=  '<p class="p-title"> 评论数量 = '+ productlist[i]['proCommentNub'] + '</p>';
			//str +=  '<p class="p-title"> 销量 '+ productlist[i]['proSoldVolume'] + '</p>';
			//end for test code

			str += '		</div>';
			str += '	</div>';
			str += '</a>';
		}
	}

	return str ;
	//$(".item-list").html(str);

}