/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-12-10 23:33:02
 * @version $Id$
 */

$(function(){
  $.ajax({
    type:"GET",
    url:"data/get_menu.php",
    success:function(data){
      cart.loadMenu(data);
    }
  });
  $("#view").on("click","a",function(e){
    e.preventDefault();//阻止a的默认事件
    cart.btn(this);
  });
  $("#changeAll").on("click",function(e){
    e.preventDefault();//阻止a的默认事件
    cart.changeAll(this);
  });
  var cart={
    loadMenu:function(data){//加载菜单数据
      var i,$div,$ul,det,j,$li,$frag,$numBox;//将循环变量定义到顶部
      var $view=$("<div></div>");//声明一个容器
      for(i=0;i<data.length;i++){//--写入标题模块
        det=data[i].details;
        $div=$("<div class='clearfix'><h4 class='plr'><span class='"+data[i].ico+" pd3'></span>"+data[i].k_name+"</h4></div>");
        $ul=$("<ul class='list-group'></ul>");
        for(j=0;j<det.length;j++){//--写入菜单模块
          $li=$("<li class='list-group-item clearfix'><div class='pull-left mt6'><a href='#'><span class='icon-radio1 fz3'></span></a></div></li>");
          $frag=$("<div class='pull-left'><img src='imgs/"+det[j].img+"'></div><h4>"+det[j].m_name+"</h4><p>"+det[j].unit+"</p><p class='price'>￥"+det[j].price+"元</p>");
          $numBox=$("<div class='pull-right numBox'><a href='#'><span class='icon-minus'></span></a><span class='count'>0</span><a href='#'><span class='icon-add'></span></a></div>");
          $ul.append($li.append($frag,$numBox));
        }
        $view.append($div.append($ul));
      }
      $("#view").append($view);//将加载完成的容器写入页面
    },
    btn:function(a){//mian--主页view上所有按钮点击事件
      var span=$(a).find("span");//获取当前点击元素的span
      var li=$(a).parent().parent();//获取父元素li
      var price=parseFloat(li.find(".price").html().slice(1));//获取单价
      var val=parseFloat(li.find(".count").html());//获取数量
      var total=parseFloat($(".total").html());//获取合计额
      var fz3=li.find(".fz3");//根据单击传入的参数，fz3可以等同于span
      var setTotal=function(obj){//设置点击选中写入total方法
        cart.radioAdd(obj);
        total+=price*val;
        $(".total").html(total.toFixed(2));
      };
      if(span.hasClass("icon-radio1")){//--打勾按钮btn
        val===0&&li.find(".count").html(++val);
        setTotal(span);
        return;//阻止重复写入total
      }else if(span.hasClass("icon-radio2")){//--取消打勾按钮btn
        this.radioRemove(span);
        total-=price*val;
      }else if(span.hasClass("icon-add")){//--加号按钮btn
        fz3.hasClass("icon-radio1")&&setTotal(fz3);
        li.find(".count").html(++val);
        total+=price;
      }else if(span.hasClass("icon-minus")){//--减号按钮btn
        if(val===0){
          fz3.hasClass("icon-radio2")&&this.radioRemove(fz3);
          return;//阻止减号出现负数，跳出方法
        }
        fz3.hasClass("icon-radio1")&&setTotal(fz3);
        total-=price;
        li.find(".count").html(--val);
        val===0&&this.radioRemove(fz3);
      }
      $(".total").html(total.toFixed(2));//处理点击后将total写入
    },
    radioAdd:function(span){//切换勾选状态--打勾
      span.parent().addClass("hover");
      span.removeClass("icon-radio1").addClass("icon-radio2");
      //添加全选按钮状态
      if($("main .icon-radio1").length===0&&$("footer .fz3").hasClass("icon-radio1")){
        this.radioAdd($("footer .fz3"));
      }
    },
    radioRemove:function(span){//切换勾选状态--取消打勾
      span.parent().removeClass("hover");
      span.removeClass("icon-radio2").addClass("icon-radio1");
      //撤销全选按钮状态
      $("footer .fz3").hasClass("icon-radio2")&&this.radioRemove($("footer .fz3"));
    },
    changeAll:function(a){//footer--全选按钮点击事件
      if($(a).hasClass("hover")){
        $("main .icon-radio2").each(function(i,dom){
          cart.btn($(dom).parent());
        });
      }else{
        this.radioAdd($(a).find("span"));
        $("main .icon-radio1").each(function(i,dom){
          cart.btn($(dom).parent());
        });
      }
    }
  };
  //*****模拟后台返回菜单数据data
  // var data=[
  //   {ico:"icon-greens",k_name:"蔬菜",details:[
  //     {img:"pic.png",m_name:"有机西红柿番茄",unit:"单位：500g/份 s11号档口",price:"32.00"},
  //     {img:"pic.png",m_name:"有机西红柿番茄",unit:"单位：500g/份",price:"28.00"},
  //     {img:"pic.png",m_name:"模拟数据-10",unit:"单位：500g/份 s311号档口",price:"18.00"},
  //   ]},
  //   {ico:"icon-fish",k_name:"水产",details:[
  //     {img:"pic.png",m_name:"新鲜海鲈鱼",unit:"单位：500g/条 s11号档口",price:"12.00"},
  //     {img:"pic.png",m_name:"新鲜秋刀鱼",unit:"单位：500g/条",price:"14.00"}
  //   ]},
  //   {ico:"icon-fish",k_name:"模拟数据品种1",details:[
  //     {img:"pic.png",m_name:"模拟数据-20",unit:"单位：500g/条 s11号档口",price:"23.00"},
  //     {img:"pic.png",m_name:"模拟数据-20",unit:"单位：500g/条",price:"16.00"}
  //   ]}
  // ];
  // cart.loadMenu(data);//模拟后台数据接口写入
});

