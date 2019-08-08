<?php 
  require_once('./conn.php');
  require_once('./handle_verify.php');
  require_once('./alert.php');
  $id = $_GET['id'];
  $stmt = $conn->prepare("DELETE FROM AnderCat_comments WHERE (id = ? OR parent_id = ?) AND username = ?");
  $stmt->bind_param("iis",$id,$id,$username);
  
  if ($stmt->execute()) {
  	header('Location: ./index.php');
  } else {
  	alert('刪除錯誤，請再試一次','./index.php');
  }

?>