$(function(){
    // 加载页面发送请求查寻用信息渲染页面
    $.ajax({
        url:'/user/queryUserMessage',
        success:function(data){
            console.log( data );
            // 判断是否成功获取用户信息
            if(data.error){
                // 失败说明没有登录,跳转到登录页面,
                //  console.log(  location.href);当前页面url
                location='login.html?returnUrl='+location.href;
                return;
            }else{
                // 成功渲染页面
                $('.userName').html(data.username);
                $('.moblie').html(data.mobile)
            }
        }
    })
    // 注册退出登录的点击事件
    $('.btn-loginout').on('tap',function(){
        // 发送请求
        // alert('烦恼是的顾客')
        $.ajax({
            url:'/user/logout',
            success:function(data){
                // console.log( data );
                // 判断退出是否成功
                if(data.success){
                    // 成功,跳转到登录页带上当前页的url
                    location='login.html?returnUrl='+location.href;
                }
            }
        })
    })
})