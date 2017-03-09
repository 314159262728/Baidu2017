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
  document.getElementById("show").style.backgroundColor="rgb("+list[0]+","+list[1]+","+list[2]+")";

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
  textshow();
},false)

function textshow(){
  var list=getcircleRGBColor();
  document.getElementById("r").value = list[0];
  document.getElementById("g").value = list[1];
  document.getElementById("b").value = list[2];
  document.getElementById("show").style.backgroundColor="rgb("+list[0]+","+list[1]+","+list[2]+")";
  var listH=RGBtoHSL(list[0], list[1], list[2]);
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
document.getElementById("r").addEventListener("keyup",changeRGB,false)
document.getElementById("g").addEventListener("keyup",changeRGB,false)
document.getElementById("b").addEventListener("keyup",changeRGB,false)
document.getElementById("h").addEventListener("keyup",changeHSL,false)
document.getElementById("s").addEventListener("keyup",changeHSL,false)
document.getElementById("l").addEventListener("keyup",changeHSL,false)
document.getElementsByClassName("up")[0].addEventListener("click",function(){
  document.getElementById("r").value=parseInt(document.getElementById("r").value)+5;
  changeRGB();
},false)
document.getElementsByClassName("down")[0].addEventListener("click",function(){
  document.getElementById("r").value=parseInt(document.getElementById("r").value)-5;
  changeRGB();
},false)
document.getElementsByClassName("up")[1].addEventListener("click",function(){
  document.getElementById("g").value=parseInt(document.getElementById("g").value)+5;
  changeRGB();
},false)
document.getElementsByClassName("down")[1].addEventListener("click",function(){
  document.getElementById("g").value=parseInt(document.getElementById("g").value)-5;
  changeRGB();
},false)
document.getElementsByClassName("up")[2].addEventListener("click",function(){
  document.getElementById("b").value=parseInt(document.getElementById("b").value)+5;
  changeRGB();
},false)
document.getElementsByClassName("down")[2].addEventListener("click",function(){
  document.getElementById("b").value=parseInt(document.getElementById("b").value)-5;
  changeRGB();
},false)
document.getElementsByClassName("up")[3].addEventListener("click",function(){
  document.getElementById("h").value=(parseFloat(document.getElementById("h").value)+0.05).toFixed(2);
  changeHSL();
},false)
document.getElementsByClassName("down")[3].addEventListener("click",function(){
  document.getElementById("h").value=(parseFloat(document.getElementById("h").value)-0.05).toFixed(2);
  changeHSL();
},false)
document.getElementsByClassName("up")[4].addEventListener("click",function(){
  document.getElementById("s").value=(parseFloat(document.getElementById("s").value)+0.05).toFixed(2);
  changeHSL();
},false)
document.getElementsByClassName("down")[4].addEventListener("click",function(){
  document.getElementById("s").value=(parseFloat(document.getElementById("s").value)-0.05).toFixed(2);
  changeHSL();
},false)
document.getElementsByClassName("up")[5].addEventListener("click",function(){
  document.getElementById("l").value=(parseFloat(document.getElementById("l").value)+0.05).toFixed(2);
  changeHSL();
},false)
document.getElementsByClassName("down")[5].addEventListener("click",function(){
  document.getElementById("l").value=(parseFloat(document.getElementById("l").value)-0.05).toFixed(2);
  changeHSL();
},false)
function changeRGB(){
  var RGBlist=getRGB();
  var HSlist=RGBtoHSL(RGBlist[0], RGBlist[1], RGBlist[2]);
  document.getElementById("h").value = HSlist[0];
  document.getElementById("s").value = HSlist[1];
  document.getElementById("l").value = HSlist[2];
  colorbarposHSL(HSlist[0]);
  circleposHSL(HSlist[1],HSlist[2]);
  document.getElementById("show").style.backgroundColor="rgb("+RGBlist[0]+","+RGBlist[1]+","+RGBlist[2]+")";

}
function changeHSL(){
  var h = document.getElementById("h").value ||0;
  var s = document.getElementById("s").value ||0;
  var l = document.getElementById("l").value ||0;
  colorbarposHSL(h);
  circleposHSL(s,l);
  var list=getcircleRGBColor();
  document.getElementById("r").value = list[0];
  document.getElementById("g").value = list[1];
  document.getElementById("b").value = list[2];
  document.getElementById("show").style.backgroundColor="rgb("+list[0]+","+list[1]+","+list[2]+")";
}
function getRGB(){
  var r=document.getElementById("r").value || 0;
  var g=document.getElementById("g").value || 0;
  var b=document.getElementById("b").value || 0;
  if(r>255||g>255||b>255||r<0||g<0||b<0){
    alert("请输入0-255间的整数")
  }
  else{
    return [parseInt(r), parseInt(g), parseInt(b)]
  }
}
//在长方形中显示rgb颜色
function showRGB(r,g,b){
}
//根据HSL中h定位颜色条,
function colorbarposHSL(h){
  odrag.style.top = parseInt(h*300)+"px";
  triangleSelect();
}
//获取圆圈颜色信息
function getcircleRGBColor(){
  var x=parseInt(circle.style.left.replace("px","")-offleft);
  var y=parseInt(circle.style.top.replace("px","")-offtop);
  var imgData = ctx.getImageData(x,y,1,1);
  var data = imgData.data;
  var list=averColor(imgData.width,imgData.height,data)
  return list;
}
//根据sl定位小圆圈
function circleposHSL(s,l){
  var bool=true;
  circle.style.left=150+offleft+"px";
  circle.style.top=150+offtop+"px";
  while(bool){
    var list=getcircleRGBColor();
    var listH=RGBtoHSL(list[0], list[1], list[2]);
    var posX=parseInt(circle.style.left.replace("px",""));
    var posY=parseInt(circle.style.top.replace("px",""));
    if((listH[1]-s<0.05&&s-listH[1]<0.05)&&(listH[2]-l<0.05&&l-listH[2]<0.05)){
      document.getElementById("show").style.backgroundColor="rgb("+list[0]+","+list[1]+","+list[2]+")";
      bool=false;
      break;
    }
    else{
      if( listH[2]<l){
        circle.style.left=parseInt(circle.style.left.replace("px",""))-3+"px";
        circle.style.top=parseInt(circle.style.top.replace("px",""))-3+"px";
      }
       if(listH[1]>s){
        circle.style.left=parseInt(circle.style.left.replace("px",""))-3+"px";
      }
       if(listH[1]<s){
        circle.style.left=parseInt(circle.style.left.replace("px",""))+3+"px";
      }
       if( listH[2]>l){
         circle.style.left=parseInt(circle.style.left.replace("px",""))+3+"px";
         circle.style.top=parseInt(circle.style.top.replace("px",""))+3+"px";
       }

    }
    if(posX<=offleft+5||posX>=offleft+295||posY<=offtop+5||posY>=offleft+295){
     bool=false;
     document.getElementById("show").style.backgroundColor="rgb("+list[0]+","+list[1]+","+list[2]+")";
   }
  }
}

function HSLtoRGB(h,s,l){
    var r, g, b;
    var temp1, temp2, temp3;
    temp3 = [0, 0, 0];
    if(s == 0) {
        r = g = b = l;
    } else {
        temp2 = (l < 0.5) ? l * (1.0 + s) : l + s - l * s;
        temp1 = 2.0 * l - temp2;
        var h =h * 1.0/ 360.0;
        temp3[0] = h + 1.0/3.0;
        temp3[1] = h;
        temp3[2] = h - 1.0/3.0;
        for (var i=0; i < 3; i++){
            if(temp3[i] < 0) temp3[i] += 1;
            if(temp3[i] > 1) temp3[i] -= 1;
            if(temp3[i] * 6 < 1){
                temp3[i] = temp1+(temp2-temp1)*6.0*temp3[i];
            }
            else if(temp3[i] * 2.0 < 1){
                temp3[i] = temp2;
            }
            else if(temp3[i] * 3.0 < 2){
                temp3[i] = temp1+(temp2-temp1)*((2.0/3.0)-temp3[i])*6.0
            }
            else {
                temp3[i] = temp1;
            }
        }
        r = temp3[0];
        g = temp3[1];
        b = temp3[2];
    }
    return [ Math.floor((255 * r)), Math.floor((255 * g)), Math.floor((255 * b))]
}
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
function RGBtoHSL(r, g, b){
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

    return [h.toFixed(2), s.toFixed(2), l.toFixed(2)];
}
