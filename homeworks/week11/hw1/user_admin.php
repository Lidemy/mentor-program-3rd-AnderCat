<?php
require_once('./conn.php');
require_once('./handle_verify.php');
?>

<!DOCTYPE html>
<html>
<head>
	<title>留言板</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="./messeage_board.css">
</head>
<body>
	<nav class="nav">
		<a href="./index.php" class="home" style="text-decoration: none;">留言板</a>
		<div class='nav_right'>
		<?php
		if (isset($_COOKIE['verify_id']) && !empty($_COOKIE['verify_id'])) {
		    echo "<p>你好 ,".$username . "</p>";
		    echo "<a href='./logout.php' style='text-decoration:none;'> 登出</a>";
		} else {
			echo "<a href='./login.php' style='text-decoration:none;'>登入 </a>";
			echo "<a href='./register.php' style='text-decoration:none;'>註冊</a>";
		}?>
		</div>
	</nav>
	<div class="container">	
		<div class="warning" color="black">「本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼」 </div>
		<?php
		  $sql = "SELECT c.id,c.comment, c.created_at, users.nickname FROM AnderCat_comments as c LEFT JOIN AnderCat_users as users ON c.username = users.username WHERE c.username = '". $username ."' ORDER BY c.id DESC LIMIT 50";
		  $result = $conn->query($sql);
		  if ($result->num_rows > 0) {
		  	while($row = $result->fetch_assoc()) {
		  		?>
		  		<div class="comments">
					<div class="name">
						<h3><?php echo $row['nickname']; ?></h3>
					<span class="time"><?php echo $row['created_at'];?></span>
					</div>
					<pre><?php echo $row['comment'];?></pre>
					<div class="right">
						<a onclick="return confirm('確定要刪除嗎?');" href= '<?php echo"handle_delete.php?id=" . $row['id']; ?>'> 刪除</a>
						<a class="edit" href= ' <?php echo "edit.php?id=" . $row['id'];?>'>編輯 </a>
					</div>
				</div>
				<?php
		  	}
		  } else {
		  	echo "<p>你還沒有留言喔! 可以到首頁先留言 </p>";
		  }
		?>
	</div>
</body>
</html>