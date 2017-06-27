<?php
  header("Content-Type:application/json;charset=UTF-8");
  $tel=$_REQUEST["tel"];
  if(empty($tel)){
    echo [];
    return;
  }
  $output=[];
  $conn=mysqli_connect("127.0.0.1","root","","kaifanla",3306);
  $sql="SET NAMES UTF8";
  mysqli_query($conn,$sql);
  $sql="SELECT oid,img_sm,order_time,user_name FROM kf_order,kf_dish WHERE kf_order.did=kf_dish.did AND phone='$tel'";
  $result=mysqli_query($conn,$sql);
  while(($row=mysqli_fetch_assoc($result))!==null){
    $output[]=$row;
  }
  echo json_encode($output);
?>