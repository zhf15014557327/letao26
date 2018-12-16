$(function(){
    // 获取URL传过来的参数split字符串方法分割decodeURI转乱码
// var canshu = decodeURI(location.search.split("=")[1]);
// console.log( canshu );
var search =getQueryString(search);


// function getQueryString(name) { 
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
//     var r = window.location.search.substr(1).match(reg); 
//     if (r != null) return decodeURI(r[1]); 
//     return null; 
//   }

// 发送请求
getProducs(search);

// 注册按钮点击事件
    $('.btn').on('tap',function(){
        // 获取input的内容
        search = $('.search .input').val();
        if(!search.trim()){
            alert('请输入要搜索的商品');
            return;
        }
        getProducs(search);
        // $('.search .input').val('');
        // location = './shopping.html'
    })

// 封装获取参数的方法
function getProducs (search){
    $.ajax({
        url:'/product/queryProduct',
        data:{proName:search,page:1,pageSize:4},
        success:function(data){
            // console.log( data );
            // 初始化模板
            var html = template('productlisttpl',data);
            $('#sport .producs').html(html);
        }
    })
}

    // 封装获取多参数的方法
    function getQueryString(name){
        var urlParams = location.search.substr(1).split('&');
        for(var i=0 ;i<urlParams.length; i++){
            if(name== urlParams[i].split('=')[0] ){
                return  decodeURL(urlParams[i].split('=')[1]) 
            }
        }
    }
})
// 给所有a添加点击事件
$('#nav a').on('tap',function(){
// alert('1111');
   var sort = $(this).data('sort');
//    console.log( sort );
   sort= sort==1? 2 : 1;
   $(this).data('sort',sort);
//    console.log( sort );
   var sortType =$(this).data('type');
   console.log(sortType);
   

   if(sortType=='price'){
    $.ajax({
        url:'/product/queryProduct',
        data:{proName:search,page:1,pageSize:4,price:sort},
        success:function(data){
            // console.log( data );
            // 初始化模板
            var html = template('productlisttpl',data);
            $('#sport .producs').html(html);
        }
    })
   }else if(sortType=='num'){
    $.ajax({
        url:'/product/queryProduct',
        data:{proName:search,page:1,pageSize:4,num:sort},
        success:function(data){
            // console.log( data );
            // 初始化模板
            var html = template('productlisttpl',data);
            $('#sport .producs').html(html);
        }
     })
    }

})

