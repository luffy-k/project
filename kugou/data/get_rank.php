<?php
  header("Content-Type:application/json;charset=UTF-8");
  $conn=mysqli_connect("127.0.0.1","root","","kugou",3306);
  $sql="SET NAMES UTF8";
  mysqli_query($conn,$sql);
  $sql="SELECT title,img,url,first,second FROM ranks,nums WHERE Rankid=rank";
  $result=mysqli_query($conn,$sql);
  $output=[];
  while(($row=mysqli_fetch_assoc($result))!==null){
    $output[]=$row;
  };
  echo json_encode(array_slice($output,-3));
?>