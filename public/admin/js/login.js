$(function(){
    // 注册登录点击事件
    $('.btn').on('click',function(){
        // alert('黑胡椒')
        // 获取用户名
        if( !$('.userName').val().trim()){
            alert('用户名不能为空');
            return;
        }
        // 获取密码
        if( !$('.password').val().trim()){
            alert('密码不能为空');
            return;
        }
        // 发送请求
        $.ajax({
            url:
        })
    })
    
})