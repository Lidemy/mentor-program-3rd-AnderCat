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
	<script type="text/javascript"></script>
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
		  $id = $_GET['id'];
		  $stmt = $conn->prepare("SELECT c.comment FROM AnderCat_comments as c  WHERE c.username = ? AND c.id = ?");
		  $stmt->bind_param("ss",$username,$id);
		  $stmt->execute();
		  $result = $stmt->get_result();
		  if ($result->num_rows > 0) {
		  	while($row = $result->fetch_assoc()) {
		  		?>
		  		<form method="POST" action="./handle_edit.php" class="post">
					<textarea type="textarea" name="message" class="user_message" placeholder="留言"><?php echo htmlspecialchars($row['comment'],ENT_QUOTES, 'utf-8') ;?></textarea>
					<input type="hidden" name="id" value="<?php echo $id?>">
					<button class='user_message_btn'>送出</button>
				</form>
				<?php
		  	}
		  }
		?>
	</div>
</body>
</html>
