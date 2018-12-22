

$(function(){
// 1获取url带过来的参数，decodeURL()方法转码
    // var search = decodeURI(location.search.split('=')[1]);
    // 调用函数获取参数
   var search= getQueryString('search');
    // console.log( search);
  
    // 调用函数渲染页面
    queryProduct();
 // 2 搜索按钮的点击事件
//  注册事件
 $('.btn').on('tap',function(){
    //  alert('sdfsd');
    // 获取输入框的内容
    search=$('.input').val();
    // console.log(search);
    
    // 判断是否为空,为空提示,不为空往下执行代码
    if(!search.trim()){
        alert('请输入要搜索的商品');
        return ;
    }
    // 调用函数渲染页面
    queryProduct();

 })
// 3 注册价格和销售量的点击事件
$('#nav a').on('tap',function(){
    // alert('实打实的的开发商开发机 ')
    // 获取排序参数 
     var sort =$(this).data('sort');
     console.log( sort );
    // 判断是否等于一三元运算符
      sort = sort==1? 2 : 1;
    //   重新赋值
      $(this).data('sort',sort);
    //   console.log( sort );
     var sortType  = $(this).data('type');
    //  console.log( canshu );
    var price=sortType;
    // console.log( sortType );
    $.ajax({
        url:'/product/queryProduct',
       data:{page:1,pageSize:3,proName:search,price:sort},
       success:function(data){
         // 调用模板把数据填入模板
           // 初始化模板,
           var html = template('productlisttpl',data);
           // console.log(html);
           // 把模板插入页面渲染页面
           $(".producs").html(html);
      }
    })

})
// 4.给页面主体添加下拉和上拉刷新页面
  // 初始页码
  var page= 1;
// 初始化 下拉刷新
mui.init({
    pullRefresh : {
      container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        height:100,//可选,默认50.触发下拉刷新拖动距离,
        // auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            setTimeout(function(){
                // 下拉刷新
                queryProduct();
                // 结束下拉刷新
                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
              
                // 重置下来刷新
                 mui("#refreshContainer").pullRefresh().refresh(true);
                  page=1;
            },1000)
        } 
      },
      up : {
        height:100,//可选.默认50.触发上拉加载拖动距离
        // auto:true,//可选,默认false.自动上拉加载一次
        contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore:'给不了更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            setTimeout(function(){
                    // 上拉刷新
                    page++;
                      // 传入参数发送ajax请求,获取数据
                $.ajax({
                    url:'/product/queryProduct',
                    beforSend:function(){
                        // 发送请求前显示
                        $('.mask').show();
                    },
                    complete:function(){
                          // 请求后隐藏
                         $('.mask').hide();
                    },
                    data:{page:page,pageSize:2,proName:search},
                    success:function(data){
                        // console.log( data );
                        if(data.data.length>0){
                            var html = template('productlisttpl',data);
                            $(".producs").append(html);
                              // 结束下拉刷新
                              mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                        }else{
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                        }
                    
                    }
                })
            },1000)
        } 
      }
    }
  });
   // 5 添加立即购买点击事件,
    //     跳转到商品详情页面.
    $('.producs').on('tap','.product-buy',function(){
        // alert('1111');
        var id = $(this).data('id');
        console.log( id );
        location= 'detail.html?id='+id;
    })
    

    // 封装发送ajax请求的函数重复使用
    function queryProduct(){
          // 传入参数发送ajax请求,获取数据
        $.ajax({
            url:'/product/queryProduct',
            beforSend:function(){
                // 发送请求前显示
                $('.mask').show();
            },
            complete:function(){
                  // 请求后隐藏
                 $('.mask').hide();
            },
            data:{page:1,pageSize:2,proName:search},
            success:function(data){
                // console.log(data);
                // 调用模板把数据填入模板
                // 初始化模板,
                var html = template('productlisttpl',data);
                // console.log(html);
                // 把模板插入页面渲染页面
                $(".producs").html(html);
            }
        })
    }
   
    //   封装一个获取多个参数的函数
    function getQueryString(name){
    // location.search获取当前页面的url信息
    // substr()截取字符串参数是截取字符串的位数
    // split()以参数来分割字符串,返回一个数组
    var urlParam= location.search.substr(1).split('&');
    for(var i= 0 ;i>urlParam.length; i++){
        // 判断是否是要查寻的数据
        if(name== urlParam[i].split('=')[0]){
            // 是就返回值,并转码 
           return decodeURL(urlParam[i].split('=')[1]);
        }
       return null;
      }
    }
    
})