var colorTotal = document.getElementById("color_total");
var context = colorTotal.getContext("2d");
var gradient = context.createLinearGradient(0,0,0,300);
var obox=document.getElementById("colorselbox");
var odrag=document.getElementById("colorselect");
var colorshow = document.getElementById("colorshow");
var circle = document.getElementById("circle");
var offtop=document.getElementById("frame").offsetTop;
var offleft=document.getElementById("frame").offsetLeft;
var ctx = colorshow.getContext("2d");
var isDrag = false;
var y;
gradient.addColorStop(0,"rgb(255,0,0)");
gradient.addColorStop(0.17,"rgb(255,255,0)");
gradient.addColorStop(0.335,"rgb(0,255,0)");
gradient.addColorStop(0.5,"rgb(0,255,255)");
gradient.addColorStop(0.665,"rgb(0,0,255)");
gradient.addColorStop(0.83,"rgb(255,0,255)");
gradient.addColorStop(1,"rgb(255,0,0)");
context.fillStyle = gradient;
context.fillRect(0,0,20,300);
odrag.style.left = "0px";
odrag.style.top = "0px";
(function(){
  var colorY = parseInt(odrag.style.top.replace("px",""));
  var imgData = context.getImageData(0,colorY,2,2);
  var data = imgData.data;
  var list=averColor(imgData.width,imgData.height,data);
  var grdt = ctx.createLinearGradient(0,0,300,300);
  grdt.addColorStop(0,"rgba(255,255,255,1)");
  grdt.addColorStop(1,"rgb("+list[0]+","+list[1]+","+list[2]+")")
  ctx.fillStyle = grdt;
  ctx.fillRect(0,0,300,300);
  var grdtx = ctx.createLinearGradient(0,0,0,300);
  grdtx.addColorStop(0,"rgba(0,0,0,0)");
  grdtx.addColorStop(1,"rgba(0,0,0,1)")
  ctx.fillStyle = grdtx;
  ctx.fillRect(0,0,300,300);
  circle.setAttribute("class","circle")
  circle.style.top = offtop +"px";
  circle.style.left = offleft + "px";
  textshow();
})()

odrag.addEventListener("mousedown",function(e){
      y=e.clientY-this.offsetTop;
      isDrag = true;
},false);
document.addEventListener("mousemove",function(e){
    if(isDrag){
      if((e.clientY-y)>=310){
          odrag.style.top = "300px";
      }
      else if((e.clientY-y)<=0){
        odrag.style.top = "0px";
      }
      else{
        odrag.style.top = (e.clientY-y)+"px";
      }
      triangleSelect();
      textshow();
    }


}, false)
document.addEventListener("mouseup",function(){
  isDrag = false;
}, false)
colorshow.addEventListener("click",function(e){
  circle.setAttribute("class","circle")
  circle.style.top = parseInt(e.clientY-5) + "px";
  circle.style.left = parseInt(e.clientX-5) + "px";
  textshow()
},false)
function averColor(x,y,data){
  var r=0,g=0,b=0;
  for (var row = 0; row < y; row++) {
      for (var col = 0; col < x; col++) {
          r += data[((x * row) + col) * 4];
          g += data[((x * row) + col) * 4 + 1];
          b += data[((x * row) + col) * 4 + 2];
      }
  }
  // 求取平均值
 r /= (x * y);
  g /= (x * y);
  b /= (x * y);
  // 将最终的值取整
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  var list=[r,g,b];
  return list;
}
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h.toFixed(3), s.toFixed(3), l.toFixed(3)];
}
function textshow(){
  var x=parseInt(circle.style.left.replace("px","")-offleft);
  var y=parseInt(circle.style.top.replace("px","")-offtop);
  var imgData = ctx.getImageData(x,y,1,1);
  var data = imgData.data;
  var list=averColor(imgData.width,imgData.height,data)
  document.getElementById("r").value = list[0];
  document.getElementById("g").value = list[1];
  document.getElementById("b").value = list[2];
  var listH=rgbToHsl(list[0], list[1], list[2]);
  document.getElementById("h").value = listH[0];
  document.getElementById("s").value = listH[1];
  document.getElementById("l").value = listH[2];
}
function triangleSelect(){
  var colorY = parseInt(odrag.style.top.replace("px",""));
  var imgData = context.getImageData(0,colorY,2,2);
  var data = imgData.data;
  var list=averColor(imgData.width,imgData.height,data)
  var grdt = ctx.createLinearGradient(0,0,300,0);
  grdt.addColorStop(0,"rgba(255,255,255,1)");
  grdt.addColorStop(1,"rgb("+list[0]+","+list[1]+","+list[2]+")")
  ctx.fillStyle = grdt;
  ctx.fillRect(0,0,300,300);
  var grdtx = ctx.createLinearGradient(0,0,0,300);
  grdtx.addColorStop(0,"rgba(0,0,0,0)");
  grdtx.addColorStop(1,"rgba(0,0,0,1)")
  ctx.fillStyle = grdtx;
  ctx.fillRect(0,0,300,300);
}
document.getElementById("r").addEventListener("blur",function(){
  var r=document.getElementById("r").value;
  var g=document.getElementById("g").value ;
  var b=document.getElementById("b").value ;
  var m=true;
  if(r==255){


  }
  else{

  }
/*  for(var i=0;i<=350;i++){
    odrag.style.top = i +"px";
    var colorY = parseInt(odrag.style.top.replace("px",""));
    var imgData = context.getImageData(0,colorY,2,2);
    var data = imgData.data;
    var list=averColor(imgData.width,imgData.height,data);
    var grdt = ctx.createLinearGradient(0,0,350,350);
    grdt.addColorStop(0,"rgb(255,255,255)");
    grdt.addColorStop(0.5,"rgb("+list[0]+","+list[1]+","+list[2]+")")
    grdt.addColorStop(1,"rgb(0,0,0)")
    ctx.fillStyle = grdt;
    ctx.fillRect(0,0,350,350);
    circle.style.left=offleft+"px";
    circle.style.top=offtop+"px";

    for(var j=0;j<=350;j++){
     circle.style.left=parseInt(circle.style.left.replace("px",""))+1+"px";
     circle.style.top=parseInt(circle.style.top.replace("px",""))+1+"px";
     var x=parseInt(circle.style.left.replace("px","")-offleft);
     var y=parseInt(circle.style.top.replace("px","")-offtop);
     var imgData = ctx.getImageData(x,y,1,1);
     var data = imgData.data;
     var lists=averColor(imgData.width,imgData.height,data);
     if(lists[0]==r&&lists[1]==g&&lists[2]==b ){
       m=false;
      // break;
     }
    }
}*/
},false)
