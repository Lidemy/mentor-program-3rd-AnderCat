<?php 
  require_once('./conn.php');
  require_once('./handle_verify.php');
  require_once('./alert.php');
  $message = $_POST['message'];
  $sql = "INSERT INTO AnderCat_comments(comment, username) VALUES('$message', '$username')";
  $result = $conn->query($sql);
  if ($result) {
    header('Location: ./index.php');
  } else {
    alert('連線錯誤 請再試一次','./index.php');
  }

?>