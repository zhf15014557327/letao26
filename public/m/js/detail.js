$(function(){
// 调用函数获取id
var id= getQueryString('id');
// console.log( id );
// 发送请求页面数据
$.ajax({
   
    url: "/product/queryProductDetail",
    data:{id:id},
    success: function (data) {
        console.log( data ); 
        // 处理尺码数据
        // 用字符串方法split分割数据,得到最小最大值,循环遍历出来用数组方法push一个数组里
        // 最小值,因为分割的出来的是字符串,-0 转成数字类型;
        var min= data.size.split("-")[0]-0;
        var max= data.size.split("-")[1];

        data.size=[];
        for(var i= min ; i<= max; i++){
            // console.log( i )
            data.size.push(i);
        }
    // 调用模板,渲染页面
    var html = template('detailtpl',data)
    $('.productDetail').html(html);
       // !!!后面出现的数据,要在内容加载完效果
       //才有了在初始化,轮播图初始化
     var gallery = mui('.mui-slider');
     gallery.slider({
       interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
      })
      //  区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
         indicators: false, //是否显示滚动条
         deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
         bounce: true //是否启用回弹
        })
        // 数字数字框初始化
        mui('.mui-numbox').numbox();
        // 按钮初始化
        $('.btn-size').on('tap',function(){
            $(this).addClass('active').siblings().removeClass('active');
        })
    }
});
//  添加加入购物车的点击事件
$('.btn-caret').on('tap',function(){
//  alert('是的京津冀');
// 尺码的值
var size= $(".btn-size.active").data('size')
// 判断是否选择尺码
    if(!size){
        mui.toast('请选择尺码',{ duration:'3000', type:'div' }) 
        return;
    }
    // 获取数字框的值
    var num = mui('.mui-numbox').numbox().getValue();
//    判断是否添加数量
    if(!num){
        mui.toast('请选择数量',{ duration:'3000', type:'div' }); 
        return;
    }
    // 请求购物车的接口
    $.ajax({
        url:'/cart/addCart',
        type:'POST',
        data:{productId:id,num:num,size:size},
        success:function(data){
            console.log( data );
            if(data.success){
                mui.confirm( '加入购物车成功,是否去购物车', '你好单身狗', ['去看看','不去看'], function(e){
                    // console.log(e);
                    if(e.index==0){
                       location='cart.html';
                    }else{
                        mui.toast('请继续购买',{ duration:'3000', type:'div' }); 
                    }
                })
            }else{
                // 获取当前页面的url跳转时和带到登录页面
            //    console.log( location.href  );
                location='login.html?returnUrl='+location.href;
            }
        }
    })
    
    
})


// 获取url的参数id发送请求渲染页面
function getQueryString(name) {
    var urlParams = location.search.substr(1).split('&');
    for (var i = 0; i < urlParams.length; i++) {
        if (name == urlParams[i].split('=')[0]) {
            return decodeURI(urlParams[i].split('=')[1])
        }
    }
}
})