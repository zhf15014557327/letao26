// 入口函数
// window.addEventListener('load',function(){
//     function getHtmlFontsize() {
//         // 假设一个设计稿的宽度 640
//         var DesignWidth = 750;
//         var DesignFontSize = 200;
//         // 获取当前视口的宽度
//         var nowWidth = document.documentElement.clientWidth;
//         /*750 / 200 == 375 / 100
//          设计稿宽度 / 设计稿根元素 == 当前屏幕宽度 / 当前屏幕根元素
//          375 / (750 / 200) == 100
//          当屏幕宽度  / (设计稿宽度 / 设计稿的根元素)
//          320 / (750 / 200)  == 85.3333px */
//         /* 4 / 2 == 2 / x
//          2 / ( 4 / 2 )  == 1*/
//         var nowFontSize = nowWidth / (DesignWidth / DesignFontSize);
//         document.documentElement.style.fontSize = nowFontSize + 'px';
//         console.log(nowFontSize);
        
//     }
//     getHtmlFontsize();
//     window.addEventListener('resize', getHtmlFontsize);
// })
window.addEventListener('load',function(){
           function getHtmlFontsize(){
               var DesignFontSize  = 200 ;
               var DesignWidth =750;
               var nowWidth = document.documentElement.clientWidth;
               var nowFontSize = nowWidth/(DesignWidth/DesignFontSize);
               document.documentElement.style.fontSize = nowFontSize +'px';
           }
           getHtmlFontsize();
           window.addEventListener('resize',getHtmlFontsize)

// 轮播图初始化
var gallery = mui('.mui-slider');
gallery.slider({
  interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
 })
//  区域滚动
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    bounce: true, //是否启用回弹
    scrollY: true, //是否竖向滚动
    indicators: true //是否显示滚动条
});
// mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
})
