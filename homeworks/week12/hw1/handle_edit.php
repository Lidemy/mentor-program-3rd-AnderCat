<?php 
  require_once('./conn.php');
  require_once('./handle_verify.php');
  require_once('./alert.php');
  $id = $_POST['id'];
  $comment = $_POST['message'];
  $stmt = $conn->prepare("UPDATE AnderCat_comments SET comment = ? WHERE id = ? AND username =?");
  $stmt->bind_param("sis",$comment,$id,$username);
  if ($stmt->execute()) {
  	header('Location: ./index.php');
  } else {
  	alert('更新錯誤，請再試一次','./index.php');
  }

?>