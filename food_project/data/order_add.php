<?php
	header("Content-Type:application/json;charset=UTF-8");
	$uName=$_REQUEST["uName"];
	$sex=$_REQUEST["sex"];
	$tel=$_REQUEST["tel"];
	$add=$_REQUEST["add"];
	$did=$_REQUEST["did"];
	if(empty($uName)||empty($sex)||empty($tel)||empty($add)||empty($did)){
	  echo [];
	  return;
	}
	$time=date("Y-m-d H:i:s", time()+6*60*60);
	$output=[];
	$conn=mysqli_connect("127.0.0.1","root","","kaifanla",3306);
	$sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql="INSERT INTO kf_order VALUES (NULL,'$tel','$uName','$sex','$time','$add','$did')";
  $result=mysqli_query($conn,$sql);
  if($result){
    $output["oid"]=mysqli_insert_id($conn);
    $output["msg"]="succ";
  }else{
    $output["msg"]="err";
  }
  echo json_encode($output);
?>
