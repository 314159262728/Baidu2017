var btnControl = document.getElementById("btnControl");//指令按钮
var selConValue = document.getElementById("selConValue");//指令值
var drawing = document.getElementsByTagName("canvas")[0];
var image = document.getElementById("image");
var order, i, j;
image.style.top = "150px"
image.style.left = "150px";
(function(){
  //确定浏览器支持convas元素
  if(drawing.getContext){
    var context = drawing.getContext("2d")
    //绘制路径
    context.beginPath();
    //绘制文本
    context.font = "bold 14px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    //绘制
    for( i = 30, j = 1; i < 360; i = i + 30, j++){
      context.moveTo(30, i);
      context.lineTo(330, i);
      context.moveTo(i, 30);
      context.lineTo(i,330);
      if(j <= 10){
        context.fillText(j,i+15,15);
        context.fillText(j,15,i+15);
      }
    }
    //描边路径
    context.stroke() ;
  }
})();

var control = function(order){
    switch (order) {
        case "TRA LEF":
              tra.left();
              break;
        case "TRA RIG":
              tra.right();
              break;
        case "TRA TOP":
              tra.top();
              break;
        case "TRA BOT":
              tra.back();
              break;
        case "MOV LEF":
              if(tra.left())
              {
                image.style.transform = "rotate(-90deg)";
              }
              break;
        case "MOV RIG" :
              if(tra.right()){
                image.style.transform = "rotate(90deg)";
              }
              break;
        case "MOV TOP" :
              if(tra.top()){
                image.style.transform = "rotate(0deg)";
              }
              break;
        case "MOV BOT" :
              if(tra.back()){
                image.style.transform = "rotate(180deg)";
              }
              break;
    }
}

var tra = {
  left : function(){
    if( myParseInt(image.style.left)>=60)
    {
      image.style.left =(myParseInt(image.style.left) - 30) + "px";
      return true;
    } else {
      alert("请改变方向");
      return false;
    }
  },
  right : function(){
    if(myParseInt(image.style.left)<=270){
      image.style.left =(myParseInt(image.style.left) + 30) + "px";
      return true;
    } else {
      alert("请改变方向");
      return false;
    }
  },
  top : function(){
    if(myParseInt(image.style.top)>=60){
      image.style.top =(myParseInt(image.style.top) - 30) + "px";
      return true;
    }else {
      alert("请改变方向");
      return false;
    }
  },
  back : function(){
    if(myParseInt(image.style.top)<=270){
      image.style.top =(myParseInt(image.style.top) + 30) + "px";
      return true;
    }else {
      alert("请改变方向");
      return false;
    }
  }
}
btnControl.addEventListener("click", function(){
  order = selConValue.value;
  control(order);
}, false)
function myParseInt(s) {
        var ret = parseInt(s);
      return (isNaN(ret) ? 0 : ret);
}
