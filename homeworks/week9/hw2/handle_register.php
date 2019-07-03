<?php
  require_once('./conn.php');
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];
    
  function alert($msg,$url) {
    echo "<script>";
    echo   "alert('" . htmlentities($msg, ENT_QUOTES) . "');";
    echo   "window.location = '" . $url . "'";
    echo "</script>";
  }
  if (empty($nickname) || empty($username) || empty($password)){
    alert('輸入不能為空','./register.php');
  } else {
  	$repeatNickname = "SELECT nickname FROM AnderCat_users WHERE nickname = '$nickname'";
  	$repeatUsername = "SELECT username FROM AnderCat_users WHERE username = '$username'";
  	if ($conn->query($repeatNickname)->num_rows !== 0) {
  		alert('暱稱重複','./register.php');
  	} else if ($conn->query($repeatUsername)->num_rows !== 0) {
  		alert('帳號重複','./register.php');
  	} else {
  		$sql = "INSERT INTO AnderCat_users(nickname,username,password) VALUES('$nickname', '$username', '$password')";
    	if ($conn->query($sql)) {
      		alert('註冊成功', './login.php');
    	} else {
      		alert('網頁出錯 請重試一次', './register.php');
    	}
  	}
  }
?>