$(document).ready(function() {
   
   $("#sousou").click(function(){
	   $(".order_top_count").show();
   });
   
   $("#nav-left_ll").click(function(){
	   $(".order_top_count").hide();
   });

    $("#self").click(function (){
        //$.session.clear();
        userId = $.session.get('userId');
        if(userId != "-1" && userId)
        {
            location.href="self.html";
        }
        else {
            location.href="login.html?fr=1";
        }

    });

    $("#shopcart").click(function (){
        //$.session.clear();
        userId = $.session.get('userId');
        if(userId != "-1" && userId)
        {
            location.href="shopcart.html";
        }
        else {
            location.href="login.html?fr=2";
        }

    });

    ajaxgGetCategory();
});


function searchproduct(){
   var keyword = document.getElementById("keyword").value;
   if(keyword == undefined || keyword==null ||keyword ==""){
     alert("请输入搜索关键字！");
     return false;
   }
   document.getElementById("searchform").submit();
}


function ajaxgGetCategory(){
    //var c = $(object).text() ;
    $.ajax({
        type: 'post',
        async: true,
        url: 'action/category.php',
//       contentType: false,    //不可缺
//      processData: false,    //不可缺
        dataType: "json",
        success: function (data, status) {
            //ajax 成功
            //配置焦点图代码
            test(data);
            test2(data);
        },
        error: function (data, status, e) {
            console.log("系统异常" + data + e);
        },
        beforeSend: function(xhr){
        }
    });

}

function test(data){

    var str ="";
    var categoryProduct = data.categoryProduct ;
    if(categoryProduct){
        str += '<ul>';
        for(var i=0;i<categoryProduct.length;i++){

            str += ' <li>';
            str += '<a href="category_list.html">';
            str += '<img alt="图片大小为100*100" style="width:initial;height:100px;" src="img/'+ categoryProduct[i]['image'] + '">';
            str += '<div style="width:90%;white-space: nowrap;text-overflow: ellipsis;overflow:hidden;text-align:center;margin: auto;">'+categoryProduct[i]['title'] +'</div>';
            str += '</a>';
            str += '</li>';
            str += '<li>';

        }
        str += '</ul>';
    }

    $(".container .product-areat").html(str);

}

function test2(data){

    var str ="";
    var categoryBrand = data.categoryBrand ;
    if(categoryBrand){
        str += '<ul>';
        for(var i=0;i<categoryBrand.length;i++){

            str += ' <li>';
            str += '<a href="category_list.html">';
            str += '<img alt="图片大小为200*1050" style="height: 39px;" src="img/'+ categoryBrand[i]['image'] + '">';
            str += '</a>';
            str += '</li>';
            str += '<li>';

        }
        str += '</ul>';
    }

    $(".container .brand-areat").html(str);

}