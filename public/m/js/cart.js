$(function(){
//   发送请求加载页面
// 调用函数加载页面
    queryCarts();
// 点击刷新
$('.break').on('tap',function(){
    // alert('吃饭的基金')
    queryCarts();
})
  //    下拉刷新初始化
  var page= 1;
  // 初始化 下拉刷新
  mui.init({
      pullRefresh : {
        container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
          height:100,//可选,默认50.触发下拉刷新拖动距离,
          contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
          contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
          contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
          callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              setTimeout(function(){
                  // 下拉刷新
                  queryCarts()
                  // 结束下拉刷新
                  mui('#refreshContainer').pullRefresh().endPulldownToRefresh(false);
                
                  // 重置下来刷新
                   mui("#refreshContainer").pullRefresh().refresh(true);
                    page=1;
                    // 上拉刷新空订单
                    $('.mui-pull-left span').html("");
              },1000)
          } 
        },
        up : {
          height:100,//可选.默认50.触发上拉加载拖动距离
          contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
          contentnomore:'给不了更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
          callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              setTimeout(function(){
                      // 上拉刷新
                      page++;
                        // 传入参数发送ajax请求,获取数据
                        $.ajax({
                            url:'/cart/queryCartPaging',
                            data:{page:page,pageSize:4},
                            success:function(data){
                                // console.log( data );
                                if(data.error){
                                    // 未登录
                                    location ='login.html?returnUrl='+location.href;
                                }else{ 
                                    // 判断是不是数组是就把数组转成对象,重新给data重新赋值
                                    if(data instanceof Array){
                                        data={
                                            data:[]
                                        }
                                    }
                                    if(data.data.length>0){
                                        var html = template('cartTpl',data);
                                        $(".cart-main").append(html);
                                          // 停止下拉刷新
                                          mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                                          
                                    }else{ 
                                        //  结束下拉刷新
                                        mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                    }
                                }
                      }
                  })
              },1000)
          } 
        }
      }
    });
  
    // 生成订单change事件
    $(".cart-main").on('change','.choose',function(){
    //   console.log($(this));
    // 获取被选中的数量成数组
        var checkds= $(".choose:checked");
    //    console.log( checkds );
    // 申明一个变量存总的和
    var str=0;
    // 求总的和
    checkds.each(function(index,value){
        // 获取单价
        var price= $(value).data('price');
        // 获取数量
        var num= $(value).data('num');
        var count= price*num
        str+=count
        })
        // str= parseInt(str *100)/100;
        str=str.toFixed(2);
        $('.mui-pull-left span').html(str);
    })


    // 注册删除的点击事件
    $(".cart-main").on('tap','.delete',function(){
        // alert('几分几分 ')
        var that = this;
        var id =$(this).data('id');
        // console.log( id  );
        $.ajax({
            url:"/cart/deleteCart",
            data:{id:id},
            success:function(data){
            //    console.log( data  );
              if(data.success){
                //   删除成功刷新页面
                mui.confirm( '是否要删除商品', '删除商品',['确定','取消'],function(e){

                    if(e.index==0){
                        queryCarts();
                    }else{
                       mui.swipeoutClose($(that).parent().parent()[0]) 
                    }
                })
              
              
              }
            }
        })
    })

    // 注册编辑按钮的点击事件
    $('.cart-main').on('tap','.redact',function(){
        // alert('父节点就');
        var that = this;
        // 把数据转成数组
        // 取出被点击商品的信息
        var product =$(this).data('product');
        console.log( product );
        // 最小值
        var min = product.productSize.split('-')[0]-0;
        // 最大值
        var max = product.productSize.split('-')[1];
        // 声明空数组
        product.productSize = [];
        for(var i= min; i<= max; i++){
            // 遍历数据,push进数组中
            product.productSize.push(i);
        }
        //  console.log( product )
        // 调用模板
        var html = template('edit',product);

        // str = str.replace(/[\r\n]/g,'');去掉回车换行符
        html=html.replace(/[\r\n]/g,'');
        // console.log( html );

       mui.confirm( html, '确定修改商品吗?',['确定','取消'],function(e){
           if(e.index==0){
            //确定
            $.ajax({
                url:'/cart/updateCart',
                type:"post",
                data:{id:product.id,
                    size:$('.btn-size.active').data('size'),
                    num:mui('.mui-numbox').numbox().getValue()},
                success:function(data){
                    if(data.success){
                        // 修改成功,复位.
                        queryCarts();
                    }
                }
            })
            
           }else{
            //    取消
            mui.swipeoutClose($(that).parent().parent()[0]); 
           }
       })
    //    数字框初始化
    mui('.mui-numbox').numbox();
    // 设置默认值
    mui('.mui-numbox').numbox().setValue(product.num)
    // 初始化尺码按钮
        $('.btn-size').on('tap',function(){
            $(this).addClass('active').siblings().removeClass('active');
        })
    })

  // 封装一个加载刷新购物车页面的函数      queryProduct();
  function queryCarts(){
    $.ajax({
        url:'/cart/queryCartPaging',
        beforSend:function(){
            // 发送请求前显示
            $('.mask').show();
        },
        complete:function(){
              // 请求后隐藏
             $('.mask').hide();
        },
        data:{page:1,pageSize:4},
        success:function(data){
            // console.log( data );
            if(data.error){
                // 未登录,跳转到登录页
                location ='login.html?returnUrl='+location.href;
            }else{
                   // 判断是不是数组是就把数组转成对象,重新给data重新赋值
                      if(data instanceof Array){
                                        data={
                                            data:[]
                                        }
                                    }
            // 模板初始化
            var html= template('cartTpl',data);
            //  console.log( html );
            // 模板渲染页面
           $('.cart-main').html(html)
            }
        }
    })
}
})