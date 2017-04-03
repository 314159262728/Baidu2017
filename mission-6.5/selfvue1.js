function Vue(obj){
  if(obj.el){
    this.selector=obj.el;
    this.data=obj.data;
    if(this.selector.indexOf("#")==0){
      var html=document.getElementById(this.selector.slice(1)).innerHTML;
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
        }
        if(realdata){
          html=html.replace(/\{{2}.*\}{2}/,realdata);
        }
      }
      document.getElementById(this.selector.slice(1)).innerHTML=html;
    }
  }
}
