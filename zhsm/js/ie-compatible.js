//ie8兼容HTMLElement对象
window.HTMLElement = window.HTMLElement || Element;
//ie8兼容bind方法
if (!Function.prototype.bind) {Function.prototype.bind = function (oThis) {if (typeof this !== "function") {throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable"); } var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function () {}, fBound = function () {return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments))); }; fNOP.prototype = this.prototype; fBound.prototype = new fNOP(); return fBound; }; }
//ie8兼容addEventListener
(function(){
  //为window对象添加
  addEventListener=function(n,f){
    if("on"+n in this.constructor.prototype)
      this.attachEvent("on"+n,f);
    else {
      var o=this.customEvents=this.customEvents||{};
      n in o?o[n].push(f):(o[n]=[f]);
    }
  };
  removeEventListener=function(n,f){
    if("on"+n in this.constructor.prototype)
      this.detachEvent("on"+n,f);
    else {
      var s=this.customEvents&&this.customEvents[n];
      if(s)for(var i=0;i<s.length;i++)
        if(s[i]==f)return void s.splice(i,1);
    }
  };
  dispatchEvent=function(e){
    if("on"+e.type in this.constructor.prototype)
      this.fireEvent("on"+e.type,e);
    else {
      var s=this.customEvents&&this.customEvents[e.type];
      if(s)for(var s=s.slice(0),i=0;i<s.length;i++)
        s[i].call(this,e);
    }
  };
  //为document对象添加
  HTMLDocument.prototype.addEventListener=addEventListener;
  HTMLDocument.prototype.removeEventListener=removeEventListener;
  HTMLDocument.prototype.dispatchEvent=dispatchEvent;
  HTMLDocument.prototype.createEvent=function(){
    var e=document.createEventObject();
    e.initMouseEvent=function(en){this.type=en;};
    e.initEvent=function(en){this.type=en;};
    return e;
  };
  //为全元素添加
  var tags=[
    "Unknown","UList","Title","TextArea","TableSection","TableRow",
    "Table","TableCol","TableCell","TableCaption","Style","Span",
    "Select","Script","Param","Paragraph","Option","Object","OList",
    "Meta","Marquee","Map","Link","Legend","Label","LI","Input",
    "Image","IFrame","Html","Heading","Head","HR","FrameSet",
    "Frame","Form","Font","FieldSet","Embed","Div","DList",
    "Button","Body","Base","BR","Area","Anchor"
  ],html5tags=[
    "abbr","article","aside","audio","canvas","datalist","details",
    "dialog","eventsource","figure","footer","header","hgroup","mark",
    "menu","meter","nav","output","progress","section","time","video"
  ],properties={
    addEventListener:{value:addEventListener},
    removeEventListener:{value:removeEventListener},
    dispatchEvent:{value:dispatchEvent}
  };
  for(var o,n,i=0;o=window["HTML"+tags[i]+"Element"];i++)
    tags[i]=o.prototype;
  for(i=0;i<html5tags.length;i++)
    tags.push(document.createElement(html5tags[i]).constructor.prototype);
  for(i=0;o=tags[i];i++)
    for(n in properties)Object.defineProperty(o,n,properties[n]);
})();
//ie8兼容getComputedStyle
function getComputedStyle(obj,attr){
  return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}


