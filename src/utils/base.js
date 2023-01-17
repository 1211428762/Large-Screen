exports.install = function (Vue) {
  
  // 示例
  // this.numAutoPlus("test", { 
  //   time: 5000,  //总时间--毫秒为单位 
  //   num: 12000,  //要显示的真实数值
  //   interval: 35 //显示数值多长间隔改变一次 毫秒
  // })

  Vue.prototype.numAutoPlus = function (targetId, myOptions){//全局函数
  var $this = document.getElementById(targetId), 
  time = myOptions.time , //总时间--毫秒为单位 
  finalNum = myOptions.num , //要显示的真实数值
  timeInterval = myOptions.interval, //显示数值多长间隔改变一次 毫秒

  step = finalNum / (time / timeInterval),/*每50ms增加的数值--*/ 
  count = 0, //计数器 

  timer = setInterval(function() { 

   count = count + step; 

   if(count >= finalNum) { 
    clearInterval(timer); 
    count = finalNum; 
   } 

   $this.innerHTML = count; 
  }, timeInterval); 
  };
};
