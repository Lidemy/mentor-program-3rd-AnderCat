<?php 
  require_once('./conn.php');

  $message = $_POST['message'];
  $username = $_COOKIE['username'];
  $sql = "INSERT INTO AnderCat_comments(comment, username) VALUES('$message', '$username')";
  $result = $conn->query($sql);

  if ($result) {
  	header('Location: ./index.php');
  } else {
  	echo "failed, " . $conn->error;
  }

?>