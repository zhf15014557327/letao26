// 搜索中心js
// 入口函数
$(function(){
    // 注册按钮点击事件
    $('.dtn').on('tap',function(){
        // 获取input的内容
       var search = $('.search .shangping-search').val();
    //    console.log(search)
    //  alert('111')
        if(!search.trim()){
            alert('请输入要搜索的商品');
            return;
        }
        // 去之前的历史记录有可能什么都没有,就是空数组 getiItem 只需要键就可以获取数据类;
        var historydata =JSON.parse(localStorage.getItem("serachHistory"))||[];

        // 判断获取的记录里有没有有就删除,
        if(historydata.indexOf(search)!=-1){
            // 删除存在了的数据historydata.indexof(search)返回的是相同数据的在数组中的下标
            historydata.splice(historydata.indexOf(search),1);
        }
        // 到这的就说明数组中没有，用数组方法unshif添加数据到数组的前面
        // historydata=JSON.stringify(historydata.unshift(search));//放在一起为什么不行??????
        historydata.unshift(search);
        console.log(historydata);
        localStorage.setItem('serachHistory',JSON.stringify(historydata));
        getrecord();
        location= "productlist.html?search="+search;
       
    })
    getrecord();
   function getrecord(){
        // 获取记录
    var historydata =JSON.parse(localStorage.getItem("serachHistory"))||[];
    // 把数组包成对象
    historydata ={list:historydata};
    // 模板初始化
    var html = template('serachListtpl',historydata);
    $('.history-conter ul').html(html);
   }

        //   添加span点击事件删除被点击的数据
   $('.history-conter ul').on('tap','span',function(){
    var index= $(this).data('index');
    var historydata =JSON.parse(localStorage.getItem("serachHistory"))||[];
    historydata.splice(index,1);
    localStorage.setItem('serachHistory',JSON.stringify(historydata));
    getrecord();
   })
  //清空数据
//   添加点击事件
  $('.history-title .mui-card-header a').on('tap',function(){
    //   alert('1233')
    localStorage.removeItem("serachHistory");
    getrecord();
  })

})
