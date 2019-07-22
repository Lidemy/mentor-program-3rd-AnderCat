<?php 
  require_once('./conn.php');
  require_once('./alert.php');
  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username) || empty($password)) {
    alert('帳密不能為空', './login.php');
  } else {
    $sql = "SELECT * FROM AnderCat_users WHERE username='$username'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    if (!$result) {
      alert('$conn->error','./login.php');
      exit();
    }
    if ($result->num_rows > 0 && password_verify($password, $row['password'])) {
      $id = '';
      for($i = 0; $i < 32; $i += 1){
        $num = rand(1,3);
        switch ($num) {
          case 1:
            $id = $id . rand(0,9);
            break;
          case 2:
            $id = $id . chr(rand(65,90));
            break;
          case 3:
            $id = $id . chr(rand(97,122));
          default:
            break;
        }
      }
      $idSql = "INSERT INTO AnderCat_users_certificate(id,username) VALUES ('$id','$username') ";
      if ($conn->query($idSql)){
        setcookie("verify_id", $id, time()+3600*24);
        header('Location: ./index.php');
      } else {
        alert('連線錯誤 請再試一次','./login.php');
      }
    } else {
      alert('帳號或密碼錯誤','./login.php');
    }
  }
 ?>