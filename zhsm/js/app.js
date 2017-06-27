//封装 $ 函数替换querySelectorAll
window.$=HTMLElement.prototype.$=function(selector){
	var r=(this==window?document:this).querySelectorAll(selector);
	return r.length==0?null:r.length==1?r[0]:r;
};
//封装 on 函数替换addEventListener
HTMLElement.prototype.on=function(ename,fun){
	this.addEventListener(ename,fun);
};
//封装each函数为多个元素同时执行相同的方法
NodeList.prototype.each=function(callback){
  for(var i=0;i<this.length;i++){
    callback(this[i]);
  }
};
window.onload=function(){
  (function(){
    //*--父对象AJAX方法
    var getData={
      init:function(url){//ajax连接后台
        var xhr=new XMLHttpRequest(),isJson;
        xhr.onreadystatechange=function(){
          if(xhr.readyState===4&&xhr.status===200){
            isJson=xhr.getResponseHeader("Content-Type").indexOf("html")===-1;//判断是不是JSON
            this.load(isJson?JSON.parse(xhr.responseText):xhr.responseText);//调用子对象load方法
          }
        }.bind(this);//绑定子对象
        xhr.open("GET",url,true);
        xhr.send(null);
      }
    };
    //*--子对象页面所有功能
    //--顶部新闻滚动轮播
    var topNews={
      TIMES:4000,//滚动停留时间间隔
      STEPS:100,//滚动总步数
      DURATION:500,//滚动总时间
      load:function(data){//数据加载
        var len=data.length,liList=[],i;
        var ul=document.createElement("ul");
        for(i=0;i<len;i++){
          liList[i]=document.createElement("li");
          liList[i].innerHTML="<a href='"+data[i].url+"'>"+data[i].txt+"</a>";
          ul.appendChild(liList[i]);
        }
        $(".top_news").appendChild(ul);
        this.start(ul);//启动滚动轮播
      },
      start:function(ul){//滚动轮播
        var li,top,timer,on=true;
        var height=parseFloat(getComputedStyle($(".top_news")).lineHeight);
        var step=height/this.STEPS,interval=this.DURATION/this.STEPS;
        auto();//自动轮播
        function auto(){
          timer=setTimeout(function(){//自动轮播定时器
            on?move():auto();
          },topNews.TIMES);
        }
        function move(){
          if(timer!=null){//防止叠加
            clearInterval(timer);
            timer=null;
          }
          timer=setInterval(function(){//滚动定时器
            top=parseFloat(getComputedStyle(ul).top);
            top-=step;
            if(top>-height){
              ul.style.top=top+"px";
            }else{
              clearInterval(timer);//停止定时器
              timer=null;
              li=ul.firstElementChild;
              ul.removeChild(li);
              ul.appendChild(li);
              ul.style.top="0";
              auto();//重启自动轮播
            }
          },interval);
        }
        $(".top_news").on("mouseover",function(){//鼠标进入停止轮播
          on=false;
        });
        $(".top_news").on("mouseout",function(){//鼠标离开启动轮播
          on=true;
        });
      }
    };
    //--图片淡出轮播
    var banner={
      TIMES:3000,//淡出停留时间间隔
      STEPS:100,//淡出总步数
      DURATION:300,//淡出总时间
      idx:0,//默认起始下标
      load:function(data){//数据加载
        var i,len=data.length,liList=[],numList=[];
        var ul=document.createElement("ul");
        var frag=document.createDocumentFragment();
        for(i=0;i<len;i++){
          liList[i]=document.createElement("li");
          numList[i]=document.createElement("li");
          liList[i].innerHTML="<a href='"+data[i].url+"'><img src='img/"+data[i].img+"'></a>";
          numList[i].innerHTML=i;
          frag.appendChild(liList[i]);
          ul.appendChild(numList[i]);
        }
        $("#banner_box").appendChild(frag);
        $(".num").appendChild(ul);
        this.start(len,liList,numList);//启动图片淡出轮播
      },
      start:function(len,liList,numList){//图片淡出轮播
        var li,num,timer,on=true,opa=1;
        var interval=this.DURATION/this.STEPS,step=opa/this.STEPS,idx=this.idx;
        show(idx);//显示当前下标图片
        auto();//自动轮播
        function show(idx){
          li=liList[idx];
          num=numList[idx];
          li.className="active";
          num.className="hover";
        }
        function auto(){
          timer=setTimeout(function(){//自动轮播定时器
            on?fade():auto();
          },banner.TIMES);
        }
        function fade(){
          if(timer!==null){
            clearInterval(timer);//防止叠加
            timer=null;
          }
          timer=setInterval(function(){//图片淡出定时器
            opa=getComputedStyle(li).opacity;
            opa-=step;
            if(opa>0){
              li.style.opacity=opa;
            }else{
              stop();//停止定时器
              ++idx>=len&&(idx=0);
              show(idx);//显示当前下标图片
              auto();//重启自动轮播
            }
          },interval);
        }
        function stop(){//停止定时器，初始化当前元素
          clearInterval(timer);
          timer=null;
          num.className="";
          li.className="";
          li.style.opacity=1;
        }
        $(".banner").on("mouseover",function(){//鼠标进入停止轮播
          on=false;
        });
        $(".banner").on("mouseout",function(){//鼠标离开启动轮播
          on=true;
        });
        $(".num ul").on("mouseover",function(e){//鼠标进入圆点切换轮播图
          var target=e.target;
          if(target.nodeName==="LI"){
            if(target.className==="hover"){return;}//进入当前下标直接跳出
            stop();//停止定时器
            show(idx=target.innerHTML);//显示当前下标图片
            auto();//重启自动轮播
          }
        });
      }
    };
    //--模态框进入退出动画(无AJAX)
    var model={
      OPA:1,//透明度范围
      DISTANCE:100,//移动总距离
      STEPS:100,//移动总步数
      DURATION:500,//移动总时长
      animate:function(a){//模态框动画
        var top,opa,timer,div;
        var opaStep=this.OPA/this.STEPS,topStep=this.DISTANCE/this.STEPS,interval=this.DURATION/this.STEPS;
        if(a.className!=="close"){//判断模态框状态（打开or关闭）
          div=$('.'+a.getAttribute('href'));
          div.parentNode.style.display="block";
          timer=setInterval(function(){//打开动画定时器
            top=parseFloat(getComputedStyle(div).marginTop);
            opa=parseFloat(getComputedStyle(div).opacity);
            opa+=opaStep;
            top+=topStep;
            if(top<100){
              opa<=1&&(div.style.opacity=opa);
              div.style.marginTop=top+"px";
            }else{
              clearInterval(timer);//停止定时器
              timer=null;
              div.style.marginTop="100px";
              div.style.opacity=1;
            }
          },interval);
        }else{
          div=a.parentNode;
          timer=setInterval(function(){//关闭动画定时器
            top=parseFloat(getComputedStyle(div).marginTop);
            opa=parseFloat(getComputedStyle(div).opacity);
            opa-=opaStep;
            top-=topStep;
            if(top>0){
              opa>=0&&(div.style.opacity=opa);
              div.style.marginTop=top+"px";
            }else{
              clearInterval(timer);//停止定时器
              timer=null;
              div.parentNode.style.display="none";
              div.style.marginTop=0;
              div.style.opacity=0;
            }
          },interval);
        }
      }
    };
    //--模态框图片切换轮播
    var login_banner={
      TIMES:3000,//切换停留时间间隔
      idx:0,//默认起始下标
      load:function(data){//数据加载
        var i,len=data.length,liList=[];
        var ul=document.createElement("ul");
        for(i=0;i<len;i++){
          liList[i]=document.createElement("li");
          liList[i].innerHTML="<a href='"+data[i].url+"'><img src='img/"+data[i].img+"'></a>";
          ul.appendChild(liList[i]);
        }
        $(".show").appendChild(ul);
        this.start(len,liList);//启动图片切换轮播
      },
      start:function(len,liList){//图片切换轮播
        var idx=this.idx,li=liList[idx];
        li.className="active";//显示当前下标的图片
        var timer=setInterval(function(){//切换定时器
          li.className="";
          ++idx>=len&&(idx=0);
          li=liList[idx];
          li.className="active";
        },login_banner.TIMES);
      }
    };
    //--模态框登陆验证
    var login_form={
      init:function(){//提交验证信息
        var uname=$("[name=uname]").value;
        var upwd=$("[name=upwd]").value;
        var code=$("[name=code]").value;
        var data="uname="+uname+"&upwd="+upwd+"&code="+code;
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
          if(xhr.readyState===4&&xhr.status===200){
            this.doResponse(JSON.parse(xhr.responseText),uname);//执行响应数据
          }
        }.bind(this);
        xhr.open("POST","data/login.php",true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(data);
      },
      doResponse:function(data,uname){//显示验证结果提示框
        var info=$(".info");
        info.innerHTML=data.msg;
        info.className="info "+data.color;
        info.style.display="block";
        var timer=setTimeout(function(){//关闭提示框定时器
          info.style.display="none";
          if(data.code===1000){
            sessionStorage.setItem("loginName",uname);//验证通过保存用户数据
            $("[name=uname]").value='';
            $("[name=upwd]").value='';
            $("[name=code]").value='';
            location.href="#";//验证通过跳转指定页面
          }
        },2000);
      }
    };
    //--加载页头
    var loadHeader={
      load:function(data){//加载HTML片段
        $("#header").innerHTML=data;
        this.doResponse();//执行响应数据
      },
      doResponse:function(){
        $("#demo").on("click",function(e){//模态框打开按钮
          e.preventDefault();
          model.animate(this);
        });
        $("#login").on("click",function(e){//模态框打开按钮
          e.preventDefault();
          model.animate(this);
        });
        //*****模拟AJAX后台数据,可在静态页面显示
        // //.top_news滚动轮播
        // var topNews_data=[
        //   {txt:"【促销】相“钜”有时，厚“惠”无期!智慧商贸【爆·送·减】活动火热进行中",url:"#"},
        //   {txt:"智慧商贸进销存网页端/安卓端/苹果端免费版V1.5.0、专业版V3.13.0、连锁版V1.9.0版本...",url:"#"},
        //   {txt:"2016年智慧商贸国庆节放假通知",url:"#"},
        //   {txt:"【中奖名单】8月大促中奖名单新鲜出炉啦",url:"#"}//测试代码
        // ];
        // topNews.load(topNews_data);//传入php文件接口
        topNews.init("data/topNews.php");//传入php文件接口
      }
    };
    //--加载页尾
    var loadFooter={
      load:function(data){//加载HTML片段
        $("#footer").innerHTML=data;
      }
    };
    //--电梯楼层(无AJAX)
    var elevator={
      SPEED:1.05,//跳转速度
      TIMES:15,//跳转时间间隔
      OFFSET:53,//楼层跳转偏移量
      init:function(hEnd){
        var a=$(".elevator a"),len=a.length,h=[],i,top;
        for(i=0;i<len;i++){
          h[i]=parseInt(a[i].getAttribute("href"));
        }
        h.push(hEnd);//获取各楼层高度
        window.onscroll=function(){//滚动监听电梯楼层
          top=getScrollTop();//获取当前页面高度
          $(".btn-top").style.display=top>h[0]/2?"block":"none";//监听返回顶部按钮
          $(".elevator").style.display=top>h[0]?"block":"none";//监听楼层按钮组
          for(i=0;i<len;i++){
            a[i].className=top>h[i]&&top<h[i+1]?"hover":"";//监听楼层按钮
          }
          top>hEnd&&(a[len-1].className="");//监听楼层按钮
        }
      },
      scrollTo:function(a){//滚动跳转
        var timer,top,v;
        top=getScrollTop();//获取当前页面高度
        v=a.className==="btn-top"?0:parseFloat(a.getAttribute("href"))+this.OFFSET;//获取跳转最终高度
        if(top===v){return;}//防止重复点击
        if(top>v){
          timer=setInterval(function(){//向上滚动定时器
            setScrollTop(Math.floor(getScrollTop()/elevator.SPEED));
            if(getScrollTop()<=v){
              clearInterval(timer);//停止定时器
              timer=null;
              setScrollTop(v);//跳转指定高度
            }
          },elevator.TIMES);
        }else if(top<v){
          timer=setInterval(function(){//向下滚动定时器
            setScrollTop(Math.floor(getScrollTop()*elevator.SPEED));
            if(getScrollTop()>=v){
              clearInterval(timer);//停止定时器
              timer=null;
              setScrollTop(v);//跳转制定高度
            }
          },elevator.TIMES);
        }
      }
    };
    //--标签页
    var tabs={
      load:function(data){//数据加载
        var i,tab,len=data.length,divList=[],liList=[];
        var ul=document.createElement("ul");
        var frag=document.createDocumentFragment();
        for(i=0;i<len;i++){
          tab=data[i];
          liList[i]=document.createElement("li");
          liList[i].innerHTML="<img src='img/"+tab.img+"' alt='"+tab.id+"'>";
          divList[i]=document.createElement("div");
          divList[i].innerHTML="<h4>"+tab.title+"</h4><p>"+tab.content+"</p>";
          divList[i].setAttribute("id",tab.id);
          if(i===0){//默认展示首个标签
            liList[i].className="hover";
            divList[i].className="active";
            liList[i].innerHTML="<img src='img/"+tab.img.slice(0,-4)+"-hover.png' alt='"+tab.id+"'>";
          }
          ul.appendChild(liList[i]);
          frag.appendChild(divList[i]);
        }
        frag.appendChild(ul);
        $(".main_Tabs").appendChild(frag);//写入页面
        this.doResponse();
      },
      doResponse:function(){//切换标签页
        $(".main_Tabs ul").on("mouseover",function(e){//标签页鼠标进入
          var t=e.target;
          if(t!=this){
            while(t.parentNode!=this){//找到当前li
              t=t.parentNode;
            }
            if(t.className==="hover"){return;}//跳出重复切换
            $(".main_Tabs .hover img").src=$(".main_Tabs .hover img").src.slice(0,-10)+".png";
            $(".main_Tabs .active").className="";
            $(".main_Tabs .hover").className="";
            t.$("img").src=t.$("img").src.slice(0,-4)+"-hover.png";
            $("#"+t.$("img").alt).className="active";
            t.className="hover";
          }
        });

      }
    };
    //*--方法：滚动监听+跳转
    function getScrollTop(){//获得当前滚动高度
      return document.documentElement.scrollTop||document.body.scrollTop;//兼容火狐+IE
    }
    function setScrollTop(value){//设置滚动到指定高度
      document.documentElement.scrollTop = value;//兼容火狐+IE
      document.body.scrollTop=value;
    }
    elevator.init(3670);//传入楼层最高高度启动滚动监听
    //*--方法：对象继承
    function setProto(){
      for(var i=0,len=arguments.length;i<len;i++){
        if(Object.setPrototypeOf){//兼容IE
          Object.setPrototypeOf(arguments[i],getData);
        }else{
          arguments[i].init=function(url){//兼容IE10以下--写入init方法
            var xhr=new XMLHttpRequest(),isJson;
            xhr.onreadystatechange=function(){
              if(xhr.readyState===4&&xhr.status===200){
                isJson=xhr.getResponseHeader("Content-Type").indexOf("html")===-1;//判断是不是JSON
                this.load(isJson?JSON.parse(xhr.responseText):xhr.responseText);//调用子对象load方法
              }
            }.bind(this);//绑定子对象
            xhr.open("GET",url,true);
            xhr.send(null);
          }
        }
      }
    }
    setProto(topNews,loadHeader,loadFooter,banner,login_banner,tabs);//子对象继承
    loadHeader.init("data/header.php");//传入php文件接口
    loadFooter.init("data/footer.php");//传入php文件接口
    banner.init("data/banner.php");//传入php文件接口
    login_banner.init("data/login_banner.php");//传入php文件接口
    tabs.init("data/tabs.php");//传入php文件接口
    //*--其他页面事件
    $(".close").each(function(elem){//模态框关闭按钮
      elem.on("click",function(){
        model.animate(this);//模态框动画
      });
    }.bind(this));
    $(".affix span").on("click",function(){//侧边栏关闭按钮
      this.parentNode.style.display="none";
    });
    $("#btn-login").on("click",function(e){//提交登陆按钮
      e.preventDefault();
      //login_form.init();//调用验证方法
    });
    $(".elevator").on("click",function(e){//楼层跳转按钮
      e.preventDefault();
      e.target.nodeName==="A"&&elevator.scrollTo(e.target);//滚动跳转
    });
    $(".btn-top").on("click",function(e){//返回顶部按钮
      e.preventDefault();
      elevator.scrollTo(this);//滚动跳转
    });

    //*****--以下为模拟AJAX后台数据,可在静态页面显示
    // //.show登录页面的轮播图
    // var login_banner_data=[
    //   {img:"iBWcQYnGiM.jpg",url:"#"},
    //   {img:"JtXFtBbzJa.jpg",url:"#"},
    //   {img:"3YWZpMsp2m.jpg",url:"#"}
    // ];
    // //.banner图片广告轮播
    // var banner_data=[
    //   {img:"279354203.jpg",url:"#"},
    //   {img:"21143233906.jpg",url:"#"},
    //   {img:"1211544993.jpg",url:"#"},
    //   {img:"91402765.png",url:"#"},
    //   {img:"991326562.png",url:"#"},
    //   {img:"19101623187.jpg",url:"#"}//测试代码
    // ];
    // //.main_Tabs标签页
    // var Tabs_data=[
    //   {id:'t00',img:'36kr.png',title:'创业者 来试试"企业软件+金融"如何',content:'在我所接触的企业软件公司中，不少都在尝试与金融服务相打通，比如做进销存的\'智慧商贸\'。规范ISV市场固然是一部分考虑，更长远意义在于，大平台有了进一步接触到企业后台数据的可能。从底层打到更底层，巨头的目标是让整个世界都对自己透明。'},
    //   {id:'t01',img:'tengxun.png',title:'企业移动软件机会：移动管理需求旺盛',content:'之所以把这款软件命名为"智慧商贸"，他希望能让中小商户从前比较原始的笔记本记账、简单的电脑记账方式转变用手机和电脑系统记账管理，以此变得更加智慧，更加方便。'},
    //   {id:'t02',img:'fenghuang.png',title:'多端支持，使用场景不设限',content:'其中进销存业内最新玩起这一招的当属智慧商贸了，目前产品支持安卓设备、苹果设备、浏览器和电脑端四大平台之间无缝切换操作，在提供网页应用作为主平台，同时辅助以功能完善的移动客户端（电脑和安卓手机、苹果手机），轻松帮用户实现‘随处可用’软件来处理业务。'},
    //   {id:'t03',img:'sina.png',title:'80后新徽商的信心：产品先进优势明显',content:'智慧商贸进销存全面助力小微企业发展"智慧商贸进销存在“自下而上”的“逆行”过程中坚持了两个核心：一是满足企业基层员工的工作便携需求；另一个就是满足企业中高层管理者包括数据分析及金融服务在内的工作管理支撑需求。相对于传统经营管理软件，智慧商贸进销存提供的全方位、一站式的服务内容更利于小微企业的发展。'},
    //   {id:'t04',img:'wangye.png',title:'移动商用孵化智慧商贸',content:'在移动互联网时代，各个领域都在渐渐适应这种变化。在传统商贸向互联网商贸转型之路上，盈云科技的智慧商贸正是基于这种时代背景下做出的创新。企业发展不能一时脑热而一拥而上，只有找准创新点切中用户需求才能成功。'},
    //   {id:'t05',img:'bitewang.png',title:'多管齐下 数据管理更安全',content:'基于云技术的大数据时代逐渐成熟，企业的数据管理变得相对棘手，移动互联网+云服务让智慧商贸进销存在各种企业级应用中脱引而出，不论是云端存储、本地备份还是双服务器异地容灾备份、数据加密等措施，都为企业数据增添多种保护，让数据更安全。'},
    //   {id:'t06',img:'168.png',title:'智慧商贸进销存全面助力小微企业发展',content:'智慧商贸进销存在“自下而上”的“逆行”过程中坚持了两个核心：一是满足企业基层员工的工作便携需求；另一个就是满足企业中高层管理者包括数据分析及金融服务在内的工作管理支撑需求。相对于传统经营管理软件，智慧商贸进销存提供的全方位、一站式的服务内容更利于小微企业的发展。'},
    //   {id:'t07',img:'chuangjian.png',title:'基础功能要强，差异化功能要表现体贴入微',content:'现在的智慧商贸是处在产品的第一阶段，以进销存的产品形态为小微企业提供信息化服务，主要针对商贸流通领域的小微企业或个体商户，提供进货、销售、库存、账务及客户等方面的管理和经营状况中各环节的数据报表和数据分析，提升用户经营决策的准确性。'}
    // ];
    // //#header HTML片段
    // var header_data="<div class='w'><div class='top'><div class='top_news'></div><a href='#'></a><div class='rt'><a href='modal-dialog-reg' class='btn' id='login'>登录</a><a href='#' class='btn register'>注册</a><img src='img/tel.png'></div></div></div><div class='w'><div class='nav'><img src='img/logo.png' alt='logo'><a href='#'><img src='img/WXHead01.png'><span><img src='img/weixin.png'></span></a><ul class='rt'><li class='hover'><a href='#'>首页</a></li><li class='text'><a href='#'>产品</a><s></s><ul><li><p>通用</p></li><li><div class='box'><b class='icon1'></b><span>免费版</span><p>48项功能永久免费 0元管店</p></div></li><li><div class='box'><b class='icon2'></b><span>专业版</span><p>经营业务流程化 轻松管理</p></div></li><li><div class='box'><b class='icon3'></b><span>连锁版</span><p>连锁分店整合经营 高效管理</p></div></li><li><p>行业</p></li><li><div class='box'><b class='icon4'></b><span>服装版</span><p>智能管理 轻松管店</p></div></li></ul></li><li><a href='modal-dialog' id='demo'>演示</a></li><li><a href='#'>下载</a></li><li class='text'><a href='#'>服务</a><s></s><ul><li><div class='box'><b class='icon5'></b><span>平台支持</span><p>4大平台切换，更自由</p></div></li><li><div class='box'><b class='icon6'></b><span>行业支持</span><p>多种行业适配，更灵活</p></div></li><li><div class='box'><b class='icon7'></b><span>帮助中心</span><p>5大帮助措施，更有效</p></div></li><li><div class='box'><b class='icon8'></b><span>服务支持</span><p>6大服务途径，更省心</p></div></li></ul></li><li><a href='#'>购买</a></li><li class='text'><a href='#'>关于我们</a><s></s><ul class='v1'><li><div class='box'><span>公司简介</span></div></li><li><div class='box'><span>新闻中心</span></div></li></ul></li></ul></div></div>";
    // //#footer HTML片段
    // var footer_data="<div class='w'><div class='footer_top'><div><ul><li><a href='#' class='hover'>帮助中心</a></li><li><a href='#'>产品问答</a></li><li><a href='#'>教学视频</a></li></ul></div><div><ul><li><a href='#' class='hover'>服务支持</a></li><li><a href='#'>服务流程</a></li><li><a href='#'>自助服务</a></li><li><a href='#'>联系客服</a></li></ul></div><div><ul><li><a href='#' class='hover'>关于我们</a></li><li><a href='#'>公司介绍</a></li><li><a href='#'>新闻中心</a></li><li><a href='#'>产品论坛</a></li><li><a href='#'>联系我们</a></li><li><a href='#'>加入我们</a></li><li><a href='#'>渠道代理</a></li></ul></div><div><ul><li><a href='#' class='hover'>关注我们</a></li><li><a href='#' class='weiBo'>新浪微博</a></li><li><a href='#' class='share'>分享</a></li></ul></div><div><ul><li><a href='#' class='hover'>服务热线</a></li><li><img src='img/phoneNum.png'></li><li><a href='#' class='hover'>商务合作</a></li></ul></div><img src='img/wechat.png'></div></div><div class='w'><div class='footer_middle'><span>友情链接</span><a href='#'>雷达下载</a><a href='#'>软件下载</a><a href='#'>阿榕软件园</a><a href='#'>当快软件园</a><a href='#'>美容院管理系统</a><a href='#'>成都用友软件</a><a href='#'>专题栏软件网</a><a href='#'>A5源码</a><a href='#'>下载之家</a><a href='#'>121下载站</a><a href='#'>ZOL分流下载</a><a href='#'>西西软件园</a><a href='#'>华彩软件下载</a><a href='#'>当下软件园</a><a href='#'>进销存软件</a><a href='#'>客户关系管理软件</a><a href='#'>仓库管理系统</a><a href='#'>会员管理软件</a><a href='#'>医院管理软件</a><a href='#'>易速进销存软件</a><a href='#'>飞翔下载</a><a href='#'>crm系统</a><a href='#'>MT4平台出租</a><a href='#'>工厂下载频道</a><a href='#'>影楼后期制作软件</a><a href='#'>餐饮管理软件</a><a href='#'>企业商城系统</a><a href='#'>小东家收银软件</a><a href='#'>深知霖进销存</a><a href='#'>中关村在线</a><a href='#'>仓库管理</a><a href='#'>合肥理财网</a><a href='#'>ZOL应用下载</a><a href='#'>PC6下载</a><a href='#'>更多友链</a><a href='#'>QQ:82368259</a></div></div><div class='w'><div class='footer_bottom'><div class='lf'>合肥盈云信息科技有限公司 © 2013~2015 皖ICP备14006410号-1<a href='#'><img src='img/baicon.png'>皖公网安备 34019202000041号</a><br>安徽省合肥市天湖路19-6号   客服热线：4008-551-002</div><div class='rt'><a href='#'><img src='img/PutOnRecord.gif'></a><a href='#'><img src='img/12848.JPG'></a><a href='#'><img src='img/12847.png'></a></div></div></div>";
    // loadHeader.load(header_data);//模拟数据
    // loadFooter.load(footer_data);//模拟数据
    // banner.load(banner_data);//模拟数据
    // login_banner.load(login_banner_data);//模拟数据
    // tabs.load(Tabs_data);//模拟数据
  })();
};