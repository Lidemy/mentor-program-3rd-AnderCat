<?php 
  require_once('./conn.php');
  require_once('./handle_verify.php');
  require_once('./alert.php');
  $id = $_POST['id'];
  $comment = $_POST['message'];
  $sql = "UPDATE AnderCat_comments SET comment = '$comment' WHERE id =" . $id . " AND username ='" . $username . "'";
  if ($conn->query($sql)) {
  	header('Location: ./user_admin.php');
  } else {
  	alert('更新錯誤，請再試一次','./user_admin.php');
  }

?>