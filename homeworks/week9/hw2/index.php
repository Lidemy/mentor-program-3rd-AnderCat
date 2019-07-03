<?php
require_once('./conn.php');
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
		$sqlNickname = "SELECT nickname FROM AnderCat_users WHERE username='".$_COOKIE["username"]."'";
		$resultNickname = $conn->query($sqlNickname)->fetch_assoc();
		if (isset($_COOKIE['username']) && !empty($_COOKIE['username'])) {
			echo "<p>你好 ,$resultNickname[nickname] </p>";
			echo "<a href='./logout.php' style='text-decoration:none;'> 登出</a>";
		} else {
			echo "<a href='./login.php' style='text-decoration:none;'>登入 </a>";
			echo "<a href='./register.php' style='text-decoration:none;'>註冊</a>";
		}?>
		</div>
	</nav>
	<div class="container">	
		<div class="warning" color="black">「本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼」 </div>
		<form method="POST" action="./handle_post.php" class="post">
			<textarea type="textarea" name="message" class="user_message" placeholder="留言"></textarea>
			<?php
				if (isset($_COOKIE['username']) && !empty($_COOKIE['username'])) {
					echo "<button class='user_message_btn'>送出</button>";
				} else {
				echo "<div>登入後可以留言</div>";
				}
			?>
		</form>
		<?php
		  $sql = "SELECT c.comment, c.created_at, u.nickname FROM AnderCat_comments as c LEFT JOIN AnderCat_users as u ON c.username = u.username ORDER BY c.id DESC LIMIT 50";
		  $result = $conn->query($sql);
		  if ($result) {
		  	while($row = $result->fetch_assoc()) {
		  		?>
		  		<div class="comments">
					<div class="name">
						<h3><?php echo $row['nickname']; ?></h3>
					<span class="time"><?php echo $row['created_at'];?></span>
					</div>
					<p><?php echo $row['comment'];?></p>
				</div>
				<?php
		  	}
		  }
		?>
	</div>
</body>
</html>
