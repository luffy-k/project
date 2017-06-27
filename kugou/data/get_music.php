<?php
  header("Content-Type:application/json;charset=UTF-8");
  $conn=mysqli_connect("127.0.0.1","root","","kugou",3306);
  $sql="SET NAMES UTF8";
  mysqli_query($conn,$sql);
  $sql="SELECT sing,song,time,url,isNew FROM musics WHERE lang='CH' ORDER BY Mid DESC";
  $result=mysqli_query($conn,$sql);
  $arrCH=[];
  while(($row=mysqli_fetch_assoc($result))!==null){
    $arrCH[]=$row;
  };
  $sql="SELECT sing,song,time,url,isNew FROM musics WHERE lang='EN' ORDER BY Mid DESC";
  $result=mysqli_query($conn,$sql);
  $arrEN=[];
  while(($row=mysqli_fetch_assoc($result))!==null){
    $arrEN[]=$row;
  };
  $sql="SELECT sing,song,time,url,isNew FROM musics WHERE lang='KR' ORDER BY Mid DESC";
  $result=mysqli_query($conn,$sql);
  $arrKR=[];
  while(($row=mysqli_fetch_assoc($result))!==null){
    $arrKR[]=$row;
  };
  $sql="SELECT sing,song,time,url,isNew FROM musics WHERE lang='JN' ORDER BY Mid DESC";
  $result=mysqli_query($conn,$sql);
  $arrJN=[];
  while(($row=mysqli_fetch_assoc($result))!==null){
    $arrJN[]=$row;
  };
  $output=[];
  $output=array_merge(array_slice($arrCH,0,24),array_slice($arrEN,0,24),array_slice($arrKR,0,24),array_slice($arrJN,0,24));
  echo json_encode($output);
?>