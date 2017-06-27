<?php
	header("Content-Type:application;charset=UTF-8");
	$id=$_REQUEST["id"];
	if(empty($id)){
		return;
	}
	$conn=mysqli_connect("127.0.0.1","root","","kaifanla",3306);
	$sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql="SELECT did,img_lg,detail,name,price,material FROM kf_dish WHERE did='$id'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	echo json_encode($row);
?>