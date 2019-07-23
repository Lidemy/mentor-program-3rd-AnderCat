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
		    echo "<a href='./user_admin.php' style='text-decoration:none;'> 編輯留言</a>";
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
				if (isset($_COOKIE['verify_id']) && !empty($_COOKIE['verify_id'])) {
					echo "<button class='user_message_btn'>送出</button>";
				} else {
				
				echo "<div>登入後可以留言</div>";
				}
			?>
		</form>
		<?php
			$commentsCount = $conn->query('SELECT COUNT(id) FROM AnderCat_comments');
			$sum1 = $commentsCount->fetch_assoc(); 
			$sum = $sum1['COUNT(id)'];
			$per = 20; 
			$pages = ceil($sum/$per);
			if(!isset($_GET['page'])) {
				$page = 1;
			} else {
				$page = intval($_GET['page']);
			}
 			$start = ($page - 1) * $per;
			
		?>
		
		<?php
		  $sql = "SELECT c.comment, c.created_at, users.nickname FROM AnderCat_comments as c LEFT JOIN AnderCat_users as users ON c.username = users.username ORDER BY c.id DESC LIMIT " . $start.",".$per;
		  $result = $conn->query($sql);
		  if ($result) {
		  	while($row = $result->fetch_assoc()) {
		  		?>
		  		<div class="comments">
					<div class="name">
						<h3><?php echo $row['nickname']; ?></h3>
					<span class="time"><?php echo $row['created_at'];?></span>
					</div>
					<pre><?php echo $row['comment'];?></pre>
				</div>
				<?php
		  	}
		  }
		echo "<div class=" . "pages" . ">";
		for($i=1; $i <= $pages; $i += 1) { 
				echo ' <a href="./index.php?page='.$i.'">第' . $i . '頁</a>';
			}
		echo "</div>";
			?>
		
	</div>
</body>
</html>
