  var butArray=document.getElementsByTagName("p")
  var inputArray=document.getElementsByTagName("input")

  function test(i){
    var len = 0;
    var entext = inputArray[i].value.trim();
    var enarr = entext.split("");
    for(var j=0;j<enarr.length;j++){
      if(enarr[j].charCodeAt(0)<128){
        len = len + 1;
      } else {
        len =len + 2;
      }
    }
    if(len >= 4 && len <=16) {
      butArray[i].innerHTML='格式正确'
      butArray[i].setAttribute("class","green")
      inputArray[i].setAttribute("class","greenborder")
    } else if (len == 0){
      butArray[i].innerHTML="不能为空";
      butArray[i].setAttribute("class","red")
      inputArray[i].setAttribute("class","redborder")

    } else if(len>16){
      butArray[i].innerHTML="字符过多";
      butArray[i].setAttribute("class","red")
      inputArray[i].setAttribute("class","redborder")

    } else{
      butArray[i].innerHTML="字符不够";
      butArray[i].setAttribute("class","red")
      inputArray[i].setAttribute("class","redborder")
    }

  }
  document.getElementById("butOne").addEventListener("click",function(){
    test(0);
  },false)
  document.getElementById("butTwo").addEventListener("click",function(){
    test(1);
  },false)
  document.getElementById("butThree").addEventListener("click",function(){
    test(2);
  },false);
