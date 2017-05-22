/**
 * Created by 李畅 on 2017/5/18.
 */
const select=document.getElementById("select");
const bigcanvas = document.getElementById("bigcanvas");
const smallcanvas = document.getElementById("smallcanvas");
const  bigctx = bigcanvas.getContext("2d");
const  smallctx = smallcanvas.getContext("2d");
var isbigDrag, issmallDrag, x,y;

var img = new Image();
img.src="flower.jpg";
const scale = img.naturalWidth/256;
const selWidth = 1024/scale;
const selHeight = 768/scale;
smallcanvas.height = Number(img.naturalHeight/scale);
smallctx.drawImage(img,0,0,256,Number(img.naturalHeight/scale));

select.style.width =Number(1024/scale)+"px";
select.style.height = Number(768/scale)+"px";

var SelTop, SelLeft, imgTop, imgLeft;
function render(){
    SelTop = Number(select.style.top.replace("px",""))
    SelLeft = Number(select.style.left.replace("px",""))

    imgTop = Number(SelTop*scale);
    imgLeft = Number(SelLeft*scale);

    bigctx.drawImage(img,imgLeft,imgTop,1024,768,0,0,1024,768);
}
render();

bigcanvas.addEventListener("mousedown",function (e) {
    x = e.clientX - select.offsetLeft*4;
    y = e.clientY - select.offsetTop*4;
    isbigDrag=true;
});

smallcanvas.addEventListener("mouseenter",function (e) {
    select.style.left = e.clientX - document.getElementById("box").offsetLeft+"px";
    select.style.top = e.clientY + document.getElementById("box").offsetTop+"px";
    x = e.clientX - select.offsetLeft;
    y = e.clientY - select.offsetTop;
    issmallDrag=true;
});

document.addEventListener("mousemove",function (e) {
    var m, n, p, q,posX, posY;

    if(isbigDrag === true){
        m = 1024;
        p = m/4 - selWidth;
        n = 768;
        q = Number(smallcanvas.height) - selHeight;
        posX = (e.clientX - x)/4;
        posY = (e.clientY - y)/4;
    }
    if(issmallDrag === true){
        m = 256;
        p = m - selWidth;
        n = Number(smallcanvas.height);
        q = n - selHeight;
        posX = e.clientX - x;
        posY = e.clientY - y;
    }

    if(isbigDrag||issmallDrag){
        if(posX >= p) {
            select.style.left = p+"px"

        }
        else if(posX <0){
            select.style.left = 0+"px"
        }
        else{
            select.style.left = posX +"px"

        }

        if(posY >= q) {
            select.style.top = q+"px"
        }
        else if(posY <0){
            select.style.top = 0+"px"
        }
        else{
            select.style.top = posY +"px"

        }

        render();


    }
});

smallcanvas.addEventListener("mouseout",function (e) {
    issmallDrag = false;
});

document.addEventListener("mouseup",function(){
    isbigDrag = false;
}, false);
