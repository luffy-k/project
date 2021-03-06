/**
 * Created by Administrator on 2016/10/10.
 */
var app=angular.module("myApp",["ng","ngRoute"]);
app.controller("parentCtrl",
  ["$scope","$location",function($scope,$location){
    $scope.jump=function(url){
        $location.path(url);
    }
  }]
);
app.controller("mainCtrl",
  ["$scope","$http",function($scope,$http){
    $scope.hasMore=true;
    $http.get("data/dish_getbypage.php?start=0")
      .success(function(data){
        $scope.dishList=data;
      });
    $scope.loadMore=function(){
      $http.get("data/dish_getbypage.php?start="+$scope.dishList.length)
        .success(function(data){
          if(data.length<5){
            $scope.hasMore=false;
          }
          $scope.dishList=$scope.dishList.concat(data);
        });
    };
    $scope.$watch("kw",function(){
      if($scope.kw){
        $http.get("data/dish_getbykw.php?kw="+$scope.kw)
          .success(function(data){
            $scope.dishList=data;
          })
      }
    });
  }]
);
app.controller("detailCtrl",
  ["$scope","$http","$routeParams",function($scope,$http,$routeParams){
    $http.get("data/dish_getbyid.php?id="+$routeParams.did)
      .success(function(data){
        $scope.dish=data;
      });
  }]
);
app.controller("orderCtrl",
  ["$scope","$http","$routeParams","$rootScope",function($scope,$http,$routeParams,$rootScope){
    $scope.order={"did":$routeParams.did};
    //提交订单方法
    $scope.submitOrder=function(){
      var args=jQuery.param($scope.order);
      $http.get("data/order_add.php?"+args).success(
        function(data){
          if(data.msg=="succ"){
            $rootScope.tel=$scope.order.tel;
            $scope.succMsg="下单成功!订单编号为:"+data.oid;
          }else{
            $scope.errMsg="下单失败!";
          }
        });
    }
  }]
);
app.controller("myOrderCtrl",
  ["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $http.get("data/order_getbyphone.php?tel="+$rootScope.tel)
      .success(function(data){
        $scope.orderList=data;
      })
  }]
);
app.config(function($routeProvider){
  $routeProvider.when("/start",{
    templateUrl:"tpl/start.html"
  }).when("/main",{
    templateUrl:"tpl/main.html",
    controller:"mainCtrl"
  }).when("/detail",{
    templateUrl:"tpl/detail.html"
  }).when("/detail/:did",{
    templateUrl:"tpl/detail.html",
    controller:"detailCtrl"
  }).when("/order",{
    templateUrl:"tpl/order.html"
  }).when("/order/:did",{
    templateUrl:"tpl/order.html",
    controller:"orderCtrl"
  }).when("/myOrder",{
    templateUrl:"tpl/myOrder.html",
    controller:"myOrderCtrl"
  }).otherwise({redirectTo:"/start"})
});
