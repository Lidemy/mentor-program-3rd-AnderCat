<?php 
  require_once('./conn.php');
  require_once('./handle_verify.php');
  require_once('./alert.php');
  $id = $_GET['id'];
  $sql = "DELETE FROM AnderCat_comments WHERE id =" . $id . " AND username ='" . $username . "'";
  if ($conn->query($sql)) {
  	header('Location: ./user_admin.php');
  } else {
  	alert('刪除錯誤，請再試一次','./user_admin.php');
  }

?>