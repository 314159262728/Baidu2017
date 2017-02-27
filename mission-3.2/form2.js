  var pArray=document.getElementsByTagName("p")
  var inputArray=document.getElementsByTagName("input")
  var format=["必填，长度为4-16个字符","密码不能和用户名完全相同","确认密码，要求与上格所填密码一致","请输入合法邮箱","请输入合法手机号"]

  var assignP=function(i){
    pArray[i].innerHTML = format[i];
    inputArray[i].value="";
    if(pArray[i].hasAttribute("class")){
      pArray[i].removeAttribute("class");
    }

  }

　inputArray[0].addEventListener('focus',function(){assignP(0)},false);
  inputArray[1].addEventListener('focus',function(){assignP(1);},false);
  inputArray[2].addEventListener('focus',function(){assignP(2);},false);
  inputArray[3].addEventListener('focus',function(){assignP(3);},false);
  inputArray[4].addEventListener('focus',function(){assignP(4);},false);

  inputArray[0].addEventListener("blur",function(){test.testUser()},false);
  inputArray[1].addEventListener("blur",function(){test.testPwd()},false);
  inputArray[2].addEventListener("blur",function(){test.testConPwd()},false);
  inputArray[3].addEventListener("blur",function(){test.testEmail()},false);
  inputArray[4].addEventListener("blur",function(){test.testPhoneNum()},false);
  document.getElementById("submit").addEventListener("click",function(e){
    e.preventDefault();
    var bool = true;
    for(var j=0;j<inputArray.length; j++){
      if(inputArray[j].getAttribute("class") == "redborder"){
        bool=false;
        break;
      }
    }
    if(bool){
      alert("提交成功")
    } else {
      alert("提交失败")
    }
  },false)



  var test = {
    testUser : function(){
      var len = 0;
      var entext = inputArray[0].value.trim();
      var enarr = entext.split("");
      for(var j=0;j<enarr.length;j++){
        if(enarr[j].charCodeAt(0)<128){
          len = len + 1;
        } else {
          len =len + 2;
        }
      }
      if(len >= 4 && len <=16) {
        pArray[0].innerHTML='格式正确'
        pArray[0].setAttribute("class","green")
        inputArray[0].setAttribute("class","greenborder")
      } else if (len == 0){
        pArray[0].innerHTML="用户名不能为空";
        pArray[0].setAttribute("class","red")
        inputArray[0].setAttribute("class","redborder")

      } else if(len>16){
        pArray[0].innerHTML="用户名字符过多";
        pArray[0].setAttribute("class","red")
        inputArray[0].setAttribute("class","redborder")

      } else{
        pArray[0].innerHTML="用户名字符不够";
        pArray[0].setAttribute("class","red")
        inputArray[0].setAttribute("class","redborder")
      }
    },
    testPwd : function(){
      var m=inputArray[0].value.trim();
      var n=inputArray[1].value.trim();
      if(m == n){
        pArray[1].innerHTML = "密码与用户名一致，请重新输入";
        pArray[1].setAttribute("class","red")
        inputArray[1].setAttribute("class","redborder")
      } else{
        pArray[1].innerHTML = "格式正确";
        pArray[1].setAttribute("class","green")
        inputArray[1].setAttribute("class","greenborder")
      }
    },
    testConPwd : function(){
      if(inputArray[1].value.trim() == inputArray[2].value.trim()){
        pArray[2].innerHTML = "格式正确";
        pArray[2].setAttribute("class","green")
        inputArray[2].setAttribute("class","greenborder")
      } else {
        pArray[2].innerHTML = "两次密码输入不一致，请重新输入";
        pArray[2].setAttribute("class","red")
        inputArray[2].setAttribute("class","redborder")
      }
    },
    testEmail : function(){
      var reg=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      var t=inputArray[3].value.trim().match(reg);
      if(t){
        pArray[3].innerHTML = "格式正确";
        pArray[3].setAttribute("class","green")
        inputArray[3].setAttribute("class","greenborder")
      } else{
        pArray[3].innerHTML = "邮箱不合法，请重新输入合法邮箱";
        pArray[3].setAttribute("class","red")
        inputArray[3].setAttribute("class","redborder")
      }
    },
    testPhoneNum : function () {
      var reg=/^[1][358][0-9]{9}$/;
      var t=inputArray[4].value.trim().match(reg);
      if(t){
        pArray[4].innerHTML = "格式正确";
        pArray[4].setAttribute("class","green")
        inputArray[4].setAttribute("class","greenborder")
      } else{
        pArray[4].innerHTML = "手机号码不合法，请重新输入合法手机号";
        pArray[4].setAttribute("class","red")
        inputArray[4].setAttribute("class","redborder")
      }
    }
  }
