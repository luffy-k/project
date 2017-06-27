<?php
	header('Content-Type:application/json;charset=UTF-8');
	$uname=$_REQUEST['uname'];
	$upwd=$_REQUEST['upwd'];
	$code=$_REQUEST['code'];
	$conn=mysqli_connect('127.0.0.1','root','','zhsm',3306);
	$sql='SET NAMES UTF8';
	mysqli_query($conn,$sql);
	$sql="SELECT * FROM z_user WHERE (uname='$uname' or tel='$uname' or email='$uname') AND upwd='$upwd'";
	$result=mysqli_query($conn,$sql);
	if(($user=mysqli_fetch_assoc($result))===null){
		$arr=["code"=>1001,"msg"=>"用户名或密码错误!","color"=>"danger"];
		echo json_encode($arr);
	}else{
		$sql="SELECT * FROM codes WHERE code='$code'";
		$result=mysqli_query($conn,$sql);
		if(($cd=mysqli_fetch_assoc($result))===null){
			$arr=["code"=>1002,"msg"=>"验证码错误!请重新输入!","color"=>"warning"];
			echo json_encode($arr);
		}else{
			$arr=["code"=>1000,"msg"=>"登录信息验证正确!","color"=>"success"];
			echo json_encode($arr);
		}
	}
?>