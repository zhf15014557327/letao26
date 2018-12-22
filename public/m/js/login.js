$(function(){
    // 注册登录按钮的点击事件
    $('.btn-loging').on('tap',function(){
        // alert('111');
        // 获取表单内容
        var unserName =$('.unserName').val();
        var password =$('.password').val();
        // console.log(password);
        // 判断内容是否为空
        if(!unserName.trim()){
            mui.alert('用户名不能为空', '请输入用户名', 'ok' )
            return;
        }
        if(!password.trim()){
            mui.alert('密码不能为空', '请输入密码', 'ok' )
            return;
        }
        // 发送请求,验证获取的数据,判断是否登录
        $.ajax({
            url:'/user/login',
            type:'post',
            data:{username:unserName,password:password},
            success:function(data){
                console.log(data);
                // 判断是否成功登录
                if(data.error){
                    // 失败,提示用户重新输入
                    mui.alert(data.message, '请重新输入', 'ok' )
                }else{
                    // 成功,跳转,返回上一页
                    // history.back();
                    // 获取url传过来的地址return;
                   var returnUrl = getQueryString('returnUrl');
                //    console.log(returnUrl);
                   
                //    跳转到指定地址
                   location = returnUrl; 
                }
            }
        })
    })
  

    // 注册按钮的点击事件的
    $('.btn-register').on('tap',function(){
       
        location = 'register.html';
    })
 
    // 获取url参数的函数
    // function getQueryString(name){
    //     // location.search获取当前页面的url信息
    //     // substr()截取字符串参数是截取字符串的位数
    //     // split()以参数来分割字符串,返回一个数组
    //     var urlParam= location.search.substr(1).split('&');
    //     for(var i= 0 ;i>urlParam.length; i++){
    //         // 判断是否是要查寻的数据
    //         if(name== urlParam[i].split('=')[0]){
    //             // 是就返回值,并转码 
    //            return decodeURL(urlParam[i].split('=')[1]);
    //         }
    //        return null;
    //       }
    //     }

        function getQueryString(name) { 
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
            var r = window.location.search.substr(1).match(reg); 
            if (r != null) {
                return decodeURI(r[2]);
            } 
            return null; 
            
        } 
})