var btnControl = document.getElementById("btnControl");//指令按钮
var selConValue = document.getElementById("selConValue");//指令值
var drawing = document.getElementsByTagName("canvas")[0];
var direction = ["front", "right", "back", "left"];//正面所对应的方向
var dir = 0;//方向下标
var order, i, j;
var positionY = 0;//canvas原点的横坐标位置
var positionX = 0;//canvas原点的纵坐标位置
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
    context.translate(150,150);
    positionX += 150;
    positionY += 150;
    context.fillStyle = "#f00";
    context.fillRect(0, 5, 30, 25);
    context.fillStyle = "blue";
    context.fillRect(0, 0, 30, 5)
    //描边路径
    context.stroke() ;
  }
})();

var control = function(order){
    switch (order) {
      case "GO":
          if(direction[dir] == "front" && positionY == 30){
            alert("请改变方向")
          } else if(direction[dir] == "back" && positionY == 330 ){
            alert("请改变方向")
          } else if(direction[dir] == "left"  && positionX == 30){
            alert("请改变方向")
          } else if(direction[dir] == "right" && positionX == 330 ){
            alert("请改变方向")
          }else {
            changePosition();
          }
          break;
      case "TUN LEF":
          if(direction[dir] == "front" ) positionY = positionY +30;
          if(direction[dir] == "right") positionX = positionX -30;
          if(direction[dir] == "back") positionY = positionY -30;
          if(direction[dir] == "left") positionX = positionX +30;
          changeDirection(-Math.PI/2)
          break;
      case "TUN RIG":
          if(direction[dir] == "front" ) positionX = positionX +30;
          if(direction[dir] == "right") positionY = positionY +30;
          if(direction[dir] == "back") positionX = positionX -30;
          if(direction[dir] == "left") positionY = positionY -30;
          changeDirection(Math.PI/2)
          break;
      case "TUN BAC":
          if(direction[dir] == "front" ) {
            positionX = positionX +30;
            positionY = positionY +30;
          }
          if(direction[dir] == "right") {
            positionX = positionX -30;
            positionY = positionY +30;
          }
          if(direction[dir] == "back") {
            positionX = positionX -30;
            positionY = positionY -30;
          }
          if(direction[dir] == "left") {
            positionY = positionY -30;
            positionX = positionX +30;
          }
          changeDirection(Math.PI);
          break;
      default:

    }
}
// reg表示转换的度数，顺时针为正，逆时针为负
var changeDirection = function(reg){
  var context = drawing.getContext("2d");
  context.translate(15,15)
  context.rotate(reg)
  context.translate(-15,-15)
  context.clearRect(0,0,30,30)
  context.fillStyle = "#f00";
  context.fillRect(0, 5, 30, 25);
  context.fillStyle = "blue";
  context.fillRect(0, 0, 30, 5);
  //n表示图形转换了n个90度
  var n = reg / (Math.PI/2);
  //计算正面的方位
  dir = dir + n + 4;
  dir = dir % 4;
}
var changePosition = function(){
  var context = drawing.getContext("2d");
  context.clearRect(0,0,30,30);
  context.moveTo(30,0);
  context.lineTo(30,0);
  context.moveTo(30,30);
  context.lineTo(30,30);
  context.moveTo(0,30);
  context.closePath();
  context.stroke();
  context.translate(0,-30)
  context.fillStyle = "#f00";
  context.fillRect(0, 5, 30, 25);
  context.fillStyle = "blue";
  context.fillRect(0, 0, 30, 5);
  if(direction[dir] == "front" ) positionY = positionY -30;
  if(direction[dir] == "right") positionX = positionX +30;
  if(direction[dir] == "back") positionY = positionY +30;
  if(direction[dir] == "left") positionX = positionX -30;
}
//按钮监听事件
btnControl.addEventListener("click", function(){
  order = selConValue.value;
  control(order);
}, false)
