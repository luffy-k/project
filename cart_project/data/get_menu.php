<?php
  header("Content-Type:application/json;charset=UTF-8");
  $conn=mysqli_connect("127.0.0.1","root","","foods",3306);
  $sql="SET NAMES UTF8";
  mysqli_query($conn,$sql);
  $sql="SELECT ico,k_name,img,m_name,unit,price,num FROM kinds,menus WHERE k_num=num ORDER BY num";
  $result=mysqli_query($conn,$sql);
  $output=[];
  $details=[];
  while(($row=mysqli_fetch_assoc($result))!==null){
    $keys=array_keys($details);
    if(!in_array($row['num'],$keys)){
      $arr1['num']=$row['num'];
      $arr1['ico']=$row['ico'];
      $arr1['k_name']=$row['k_name'];
      $arr1['details']=[];
      $output[]=$arr1;
    }
    $arr2['img']=$row['img'];
    $arr2['m_name']=$row['m_name'];
    $arr2['unit']=$row['unit'];
    $arr2['price']=$row['price'];
    !isset($details[$row['num']])&&$details[$row['num']]=[];
    $details[$row['num']][]=$arr2;
  }
  for($i=0;$i<count($output);$i++){
    $output[$i]['details']=$details[$output[$i]['num']];
  }
  echo json_encode($output);
?>