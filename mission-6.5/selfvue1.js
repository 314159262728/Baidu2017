function Vue(obj,mainListener,dom,orihtml){
  this.selector=obj.el||""
  this.dom=dom||"";
  this.orihtml=orihtml||"";
  this.data=obj.data||obj;
  this.mainListener=mainListener||[];
  if(this.selector!=""){
    this.dom=obj;
    if(this.selector.indexOf("#")==0){
      var html=document.getElementById(this.selector.slice(1)).innerHTML;
      if(this.orihtml==""){
        this.orihtml=html;
      }
      if(html.indexOf(/\{{2}.*\}{2}/)<0){
        html=this.orihtml;
      }
      var matchlen=html.match(/\{{2}.*\}{2}/g).length;
      for(var j=0;j<matchlen;j++){
        var begin=html.indexOf("{{");
        var end=html.indexOf("}}");
        var t=html.slice(begin+2,end);
        var list=t.split(".");
        var len=list.length;
        var realdata=this.data;
        for(var i=0;i<len;i++){
          realdata=realdata[list[i]];
          this.mainListener.push(list[i]);
        }
        if(realdata){
          html=html.replace(/\{{2}.*\}{2}/,realdata);
          html=html.replace(realdata,this.data[list[0]][list[1]])
        }
      }

      document.getElementById(this.selector.slice(1)).innerHTML=html;
    }
  }
  this.walk(this.data);
}
Vue.prototype.walk=function(data){
  let val;
  for(let key in data){
    if(data.hasOwnProperty(key)){
      val=data[key];
      if(typeof val ==='object'){
        new Vue(val,this.mainListener,this.dom,this.orihtml);
      }
      this.convert(data,key,val);
    }
  }
}

Vue.prototype.convert = function(data,key,value){
  var elt=this;
  Object.defineProperty(data,key,{
    configurable:true,
    numberable:true,
    get:function(){
      return value;
    },
    set:function(newValue){
      if(value===newValue){
      } else if(typeof newValue=='object'){
        new Vue(newValue,elt.mainListener,elt.dom);
        //重新渲染
        if(elt.mainListener.indexOf(key)>=0){
          new Vue(elt.dom,null,null,elt.orihtml)
          console.log("重新加载了")
        }
      } else{
        value = newValue;
        //重新渲染
        if(elt.mainListener.indexOf(key)>=0){
          new Vue(elt.dom,null,null,elt.orihtml)
          console.log("重新加载了")
        }
      }
      return newValue;
    }
  });
}
