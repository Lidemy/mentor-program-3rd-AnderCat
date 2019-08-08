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
		<form method="POST" action="./handle_post.php" class="post">
			<input type="hidden" value="0" name="parent_id">
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
			$commentsCount = $conn->prepare("SELECT COUNT(id) FROM AnderCat_comments");
			$commentsCount->execute();
			$countResult = $commentsCount->get_result();
			$sum1 = $countResult->fetch_assoc(); 
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
		  $stmt = $conn->prepare("SELECT c.username,c.id,c.comment, c.created_at, users.nickname FROM AnderCat_comments as c LEFT JOIN AnderCat_users as users ON c.username = users.username WHERE c.parent_id = 0 ORDER BY c.id DESC LIMIT ?,?");
		  $stmt->bind_param("ss",$start,$per);
		  $stmt->execute();
		  $result = $stmt->get_result();
		  if ($result->num_rows > 0) {
		  	while($row = $result->fetch_assoc()) {
		  		?>
		  		<div class="comments">
		  			<div class="comment">
						<div class="name">
							<h3><?php echo $row['nickname']; ?></h3>
						<span class="time"><?php echo $row['created_at'];?></span>
						</div>
						<?php
							if (isset($username) && !empty($username) && $username === $row['username']) {
								?>
								<div class="right">
									<a onclick="return confirm('確定要刪除嗎?');" href= '<?php echo"handle_delete.php?id=" . $row['id']; ?>'> 刪除</a>
									<a class="edit" href= ' <?php echo "edit.php?id=" . $row['id'];?>'>編輯 </a>
								</div>
								<?php
							}
							?>
						<pre><?php echo htmlspecialchars($row['comment'],ENT_QUOTES, 'utf-8');?></pre>
						
					</div>
					<?php
					$parent_id = $row['id'];
		  			$subStmt = $conn->prepare("SELECT c.username,c.id,c.comment, c.created_at, users.nickname FROM AnderCat_comments as c LEFT JOIN AnderCat_users as users ON c.username = users.username WHERE c.parent_id = ? ORDER BY c.id ASC LIMIT ?,?");

		 			$subStmt->bind_param("sss",$row['id'],$start,$per);
		  			$subStmt->execute();
		  			$subResult = $subStmt->get_result();
					if ($subResult->num_rows > 0) {
						while($sub_row = $subResult->fetch_assoc()) {
							$mainResponse = $sub_row['username'] === $row['username'] ?  "style='background:#ffc4c1;'" : "";
					?>	
					<div class="sub-comments">
						<div class="sub-comment" <?php echo $mainResponse; ?>>
							<div class="name">
								<h3><?php echo $sub_row['nickname']; ?></h3>
							<span class="time"><?php echo $sub_row['created_at'];?></span>
							</div>
							<pre><?php echo htmlspecialchars($sub_row['comment'],ENT_QUOTES, 'utf-8');?></pre>
							<?php
								if (isset($username) && !empty($username) && $username === $sub_row['username']) {
									?>
									<div class="right">
										<a onclick="return confirm('確定要刪除嗎?');" href= '<?php echo"handle_delete.php?id=" . $sub_row['id']; ?>'> 刪除</a>
										<a class="edit" href= ' <?php echo "edit.php?id=" . $sub_row['id'];?>'>編輯 </a>
									</div>
									<?php
								}
							?>
						</div>
					</div>
						<?php
		  				}
		  			}
		  			?>
					
					<form method="POST" action="./handle_post.php" class="post-sub">
						<h3 class="newSub">新增留言</h3>
						<input type="hidden" value="<?php echo $parent_id?>"name="parent_id">
						<textarea type="textarea" name="message" class="user_sub_message" placeholder="留言"></textarea>
						<?php
							if (isset($_COOKIE['verify_id']) && !empty($_COOKIE['verify_id'])) {
								echo "<button class='user_message_btn'>送出</button>";
							} else {
								echo "<div>登入後可以留言</div>";
							}
						?>
					</form>
				</div>
			<?php
		  	}
		  }
		echo "<div class=" . "pages" . ">";
		echo "第 ";
		for($i=1; $i <= $pages; $i += 1) { 
				echo ' <a href="./index.php?page='.$i.'">' . $i . '</a>';
			}
		echo " 頁";
		echo "</div>";
			?>
		
	</div>
</body>
</html>
