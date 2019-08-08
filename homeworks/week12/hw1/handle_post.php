<?php 
  require_once('./conn.php');
  require_once('./handle_verify.php');
  require_once('./alert.php');
  $message = $_POST['message'];
  $parent_id = $_POST['parent_id'];
  $stmt = $conn->prepare("INSERT INTO AnderCat_comments(comment, username, parent_id) VALUES(?,?,?)");
  $stmt->bind_param("ssi", $message, $username, $parent_id);
  if ($stmt->execute()) {
  	header('Location: ./index.php');
  } else {
  	alert('連線錯誤 請再試一次','./index.php');
    exit();
  }

?>