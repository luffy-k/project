/**
 * Created by Administrator on 2016/10/18.
 */
$(function(){
  $.ajax({
    type:"GET",
    url:"data/get_banner.php",
		async:false,
    success:function(data){
      var len=data.length,divhtml='',lihtml='',i,div,li;
      for(i=0;i<len;i++){
        div="<div class='item'><img src='img/"+data[i].img+"'/></div>";
        li="<li data-slide-to='"+i+"' data-target='#banner'></li>";
        divhtml+=div;
        lihtml+=li;
      }
      $(".carousel-inner").html(divhtml);
      $(".carousel-indicators").html(lihtml);
      $(".carousel-inner>:first,.carousel-indicators>:first").addClass("active");
    }
  });
  var x=window.innerWidth,y=window.innerHeight;
  if(1050>x&&x>768&&y>600||x>1050&&y>700){
    $("#top1").addClass("animated fadeInLeft");
    $("#top2").addClass("animated fadeInRight");
  }
  if(x<768&&y>500){
    $("#top1").addClass("animated fadeInLeft");
  }
  $(window).scroll(function(){
    var top=$("body").scrollTop();
    $("[class*=col-]").each(function(i,div){
      if($(div).hasClass("animated")){return;}
      if(div.offsetTop-top<y*3/4){
        if(i%2==0){
          $(div).addClass("animated fadeInLeft");
        }else if(i%3==0){
          $(div).addClass("animated fadeInUp");
        }else if(i%5==0){
          $(div).addClass("animated fadeInDown");
        }else{
          $(div).addClass("animated fadeInRight");
        }
      }
    });
    top>180?$(".btn-top").fadeIn():$(".btn-top").fadeOut();
  });
});
var app=angular.module("myApp",[]);
app.controller("myCtrl",["$scope","$http","$interval",
  function($scope,$http,$interval){
    $scope.btnTop=function(){
      var SPEED=1.1,TIMES=15,top,t;
      t=$interval(function(){
        top=$("body").scrollTop();
        $("body").scrollTop(Math.floor(top/SPEED));
        top==0&&$interval.cancel(t);
      },TIMES);
    };
    $http.get("data/get_tab.php").success(
      function(data){
        $scope.tabData=data;
      }
    );
    $http.get("data/get_rank.php").success(
      function(data){
        $scope.rankData=data;
      }
    );
    $http.get("data/get_music.php").success(
      function(data){
        var i,j;
        $scope.musicData=data.slice(0,8);
        $("#musicNav1").on("mouseover","li",function(){
          if(this.className=="active"){return;}
          $(this).addClass("active").siblings(".active").removeClass("active");
          i=$(this).val();
          $("#num1 span").html("1/3");
          $(".prev").addClass("disabled");
          $(".next").removeClass("disabled");
          j=0;
          musicLoad(i,j);
        });
        $("#num1").on("click","em",function(){
          i=parseInt($("#musicNav1 .active").val());
          j=parseInt($("#num1 span").html());
          if(j==2){$(this).addClass("disabled");}
          if($(this).hasClass("prev")){
            if(j==1){return;}
            if(j==3){$(".next").removeClass("disabled");}
            j-=2;
          }
          if($(this).hasClass("next")){
            if(j==3){return;}
            if(j==1){$(".prev").removeClass("disabled");}
          }
          $("#num1 span").html(j+1+"/3");
          musicLoad(i,j);
        });
        function musicLoad(i,j){
          $scope.$apply(function(){
            $scope.musicData=data.slice(i*24+j*8,i*24+j*8+8);
          });
          $(".musicList [ng-show='1']").removeClass().addClass("ng-show");
          $(".musicList [ng-show='0']").removeClass().addClass("ng-hide");
        }
      }
    );
    $http.get("data/get_MV.php").success(
      function(data){
        $scope.MVData=data;
      }
    );
    $http.get("data/get_radio.php").success(
      function(data){
        $scope.radioData=data;
      }
    );
    $http.get("data/get_sing.php").success(
      function(data){
        $scope.singData=data.slice(0,5);
        var data1=data.slice(0,15),li;
        $scope.singNav=function(i,$event){
          li=$event.target.parentNode;
          if($(li).hasClass("active")){return;}
          $scope.singData=data.slice(i*15,i*15+5);
          data1=data.slice(i*15,i*15+15);
          $(li).addClass("active").siblings(".active").removeClass("active");
          $("#num2 .hover").removeClass("hover");
          $("#num2 li")[0].className="hover";
        };
        $scope.singNum=function(i,$event){
          li=$event.target;
          if($(li).hasClass("hover")){return;}
          $scope.singData=data1.slice(i*5,i*5+5);
          $(li).addClass("hover").siblings(".hover").removeClass("hover");
        };
        /*
        $("#musicNav2").on("mouseover","li",function(){
          if(this.className=="active"){return;}
          $(this).addClass("active").siblings(".active").removeClass("active");
          i=$(this).val();
          $("#num2 .hover").removeClass("hover");
          $("#num2 li")[0].className="hover";
          j=0;
          singLoad(i,j);
        });
        $("#num2").on("mouseover","li",function(){
          if(this.className=="hover"){return;}
          $(this).addClass("hover").siblings(".hover").removeClass("hover");
          i=$("#musicNav2 li.active").val();
          j=$(this).html();
          singLoad(i,j);
        });
        function singLoad(i,j){
          $scope.singData=data.slice(i*15+j*5,i*15+j*5+5);
          $scope.$apply();
        }
        */
      }
    );
    $http.get("data/get_partner.php").success(
      function(data){
        var arr=[],i=0;
        while(data.length!== 0){
          arr[i++]=data.splice(0, 7);
        }
        $scope.partnerData=arr;
      }
    );
    $http.get("data/get_link.php").success(
      function(data){
        $scope.linkData=data;
      }
    );
  }
]);
