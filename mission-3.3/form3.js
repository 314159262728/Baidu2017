
(function(){
  var citySelect = document.getElementById("city");//选择城市的select
  var schoolSelect = document.getElementById("school");//选择学校的select
  var radioStuYes =document.getElementById("stuYes");//在校生单选框
  var radioStuNo = document.getElementById("stuNo");//非在校生单选框
  var cvalue;  //select city的值
  var schoolArray;//学校数组

  var cityschoolJson = {
    "school":
    {
      "beijing":["Tsinghua","Peking"],
      "wuhan":["hust","Wuhan"],
      "xian":["Xian jaotong","Xidian"]
    }
  };
  //初始化city的select内容
  for(var i in cityschoolJson.school)
  {
    var opt=document.createElement("option");
    var text = document.createTextNode(i);
    opt.value = i;
    opt.appendChild(text);
    citySelect.appendChild(opt);
  }
  //获取城市默认值
  cvalue=citySelect.value;
  schoolArray=cityschoolJson.school[cvalue];
  //初始化school的select内容
  for(var j=0; j<cityschoolJson.school[cvalue].length; j++){
    var sopt=document.createElement("option");
    var stext = document.createTextNode(cityschoolJson.school[cvalue][j]);
    sopt.appendChild(stext);
    schoolSelect.appendChild(sopt);
  }
  //城市发生变化，学校随之改变
  citySelect.addEventListener("change",function(){
    schoolSelect.innerHTML=""//清空学校的option
    cvalue=citySelect.value;
    schoolArray=cityschoolJson.school[cvalue];
    for(var j=0; j<schoolArray.length; j++){
      var sopt=document.createElement("option");
      var stext = document.createTextNode(schoolArray[j]);
      sopt.appendChild(stext);
      schoolSelect.appendChild(sopt);
    }
  },false)
  //radio点击事件
  radioStuYes.addEventListener("click",function() {
    if(document.getElementById("student").hasAttribute("class")){
      document.getElementById("student").removeAttribute("class");
      document.getElementById("nonStudent").setAttribute("class","hidden")
    }
  },false)

  radioStuNo.addEventListener("click",function() {
    if(document.getElementById("nonStudent").hasAttribute("class")){
      document.getElementById("nonStudent").removeAttribute("class");
      document.getElementById("student").setAttribute("class","hidden");
    }
  },false)
})()
