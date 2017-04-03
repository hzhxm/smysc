/**
 * Created by zhengjinguo on 2017/3/27.
 */
$(document).ready(function(){
    $("button#login-btn").bind("click",function(){
    //$("button#login-btn").click(function(){
        var username = $(".delu-li1 input").val();
        var password = $(".delu-li2 input").val();
        if(username == "" || password == "")
        {
            alert("请输入账号／密码! ");
            return;
        }

        $.ajax({
            type: 'post',
            async: true,
            url: 'action/login.php',
//       contentType: false,    //不可缺
//      processData: false,    //不可缺
            data: {action: "loginAuth", username: username,password: password},
            dataType: "json",
            success: function (data, status) {
                //ajax 成功
                if(data.userId != "-1")
                {
                    $.session.set('userId', data.userid);

                    var curUrl = window.location.search;
                    var frUrl = curUrl.substr(4);
                    if(frUrl == 1){//from self link button
                        location.href="self.html";
                    }
                    else if(frUrl == 2){//from shopcart link button
                        location.href="shopcart.html";
                    }
                    else if(frUrl == 3 || frUrl == 4){//from bynow link button or tocart link button
                        location.href="productDetails.html";
                    }

                }
                else
                {
                    alert("账号或密码错误！");
                }
            },
            error: function (data, status, e) {
                console.log("系统异常" + data + e);
            },
            beforeSend: function (xhr) {
            }
        });
    });


    $("button.sczc-btn1").bind("click",function(){
        var regname = $("#register-name").val();
        var regpassword = $("#register-password").val();
        var regphone = $("#register-phone").val();
        if(regname == "" || regpassword == "" || regphone == "" )
        {
            alert("请输入账号／密码／手机号! ");
            return;
        }

        $.ajax({
            type: 'post',
            async: true,
            url: 'action/login.php',
//       contentType: false,    //不可缺
//      processData: false,    //不可缺
            data: {action: "registerUser", username: regname,password: regpassword,phone:regphone},
            dataType: "json",
            success: function (data, status) {
                //ajax 成功
                if(data.flag)
                {
                    location.href="login.html";
                }
                else
                {
                    alert("注册失败！");
                }
            },
            error: function (data, status, e) {
                console.log("系统异常" + data + e);
            },
            beforeSend: function (xhr) {
            }
        });
    });

    $("#to-register").click(function(){
        location.href="register.html";
    });


});