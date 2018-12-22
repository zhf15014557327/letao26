

$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        bounce: true, //是否启用回弹
        scrollY: true, //是否竖向滚动
        indicators: false //是否显示滚动条
    });

    // 分类页面的的数据请求
    // 左侧
    // 发送请求前显示
    // $('.mask').show();
    $.ajax({
        // type:'get',
        url:'/category/queryTopCategory',
        beforSend:function(){
            // 发送请求前显示
            $('.mask').show();
        },
        complete:function(){
              // 请求后隐藏
             $('.mask').hide();
        },
        success:function(data){
            // console.log(data);
            var html = template('categoryLeftTpl',data);
            // console.log(html);
            $('.shangping-left .mui-scroll').html(html);
        }
    })
    // 请求后隐藏
    // $('.mask').hide();
    // 右侧数据
    // 给左侧添加点击事件.因为是后面出来的,所以要用事件委托注册才有效
    $('.shangping-left .mui-scroll').on('tap',' a',function(){
        // 取出id
       var id =$(this).data('id');
        // console.log(id);
        // 使用id获取数据
        geyemian(id);
        // 给被点击的a加样式,其它兄弟清除样式
       $(this).addClass('active').siblings().removeClass('active');
    })
})
// 页面一打开就执行一次显示id为1的商品;
geyemian(1);

// 因为要多次用到这段代码封装成函数,可以多次调用
// 根据数据发送ajax请求
function geyemian(id){
    $.ajax({
        url:'/category/querySecondCategory',
        beforSend:function(){
            // 发送请求前显示
            $('.mask').show();
        },
        complete:function(){
              // 请求后隐藏
             $('.mask').hide();
        },
        data:{id:id},
        success:function(data){
        // console.log(data);
        var html= template('categoryrightTpl',data);
        // console.log(html);
        $('.shangping-right .mui-scroll').html(html);
        }
    })
}