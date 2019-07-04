<?php 
  require_once('./conn.php');
  function alert($msg, $url) {
    echo "<script>";
    echo   "alert('" . htmlentities($msg, ENT_QUOTES) . "');";
    echo   "window.location = '" . $url . "'";
    echo "</script>";
  }
  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username) || empty($password)) {
    alert('帳密不能為空', './login.php');
  } else {
  	$sql = "SELECT * FROM AnderCat_users WHERE username='$username' AND password='$password'";
  	$result = $conn->query($sql);
  	if (!$result) {
  	  alert('$conn->error','./login.php');
  	  exit();
  	}
  	if ($result->num_rows > 0) {
  	  setcookie("username", $username, time()+3600*24);
  	  header('Location: ./index.php');
  	} else {
  	  alert('帳號或密碼錯誤','./login.php');
  	}
  }
 ?>