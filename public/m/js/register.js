$(function(){
    // 声明一个变量根据变量的值的变化来判断验证是否通过
        var  check = true;
        // 声明一全局变量保存点击按钮返回的vCode
        var vCode
    // 注册免费注册按钮的点击事件
    $('.btn-register').on('tap',function(){
        // alert('多岁的付出的')
        // 遍历所有的input
        mui(".mui-input-row input").each(function() {
            //并且去掉空格,若当前input为空,则alert提醒 
            if(!this.value || this.value.trim() == "") {
                // 获取input的上一个兄弟
                var label = this.previousElementSibling;
                mui.alert(label.innerText + "不允许为空");
                check = false;
                return false;
            }
        }); //校验通过，继续执行业务逻辑 
            if(check){
                // 判断用户名是否超过位数
                var userName= $('.userName').val();
                if(userName.length>10){
                    mui.alert('用户名太长了!');
                    return;
                }
                // 判断手机号是否合法
                  var mobile = $('.mobile').val();
                if(!(/^1[34578]\d{9}$/.test(mobile))){ 
                    mui.alert('手机号有误!');
                    return false; 
                } 
                // 判断两次密码是否一致
                var password1 = $('.password1').val();
                var password2 = $('.password2').val();
                if(password1!=password2){
                    mui.alert('两次密码不一致!');
                    return;
                }
                // 判断验户输入的验证码和点击按钮返回的是否一致
                // 获取用户输入的验证码
                var vcode= $('.vcoder').val();
                if(vcode!=vCode){
                    mui.alert('验证码错误!');
                    return;
                }
                
                // 获取所有数据，发送请求，判断是否注册成功，成功跳转到登录页面，失败提醒
                $.ajax({
                    url:'/user/register',
                    type:'post',
                    data:{username:userName,password:password1,mobile:mobile,vCode:vcode},
                    success:function(data){
                        console.log(data);
                        // 判断是否成功登录
                        if(data.success){
                            // 登录成功,跳转到个人中心页面
                            location= "login.html?returnUrl=user.html";
                        }else{
                            // 失败提示一下
                            mui.alert(data.message);
                        }
                    }
                })
            }
        
    })
    // 注册验证码按钮的点击事件，获取后台返回的验证码
    $('.gitVcoder').on('tap',function(){
        $.ajax({
            url:"/user/vCode",
            success:function(data){
                vCode=data.vCode;
                console.log( data.vCode );
            }
        })
    })









})