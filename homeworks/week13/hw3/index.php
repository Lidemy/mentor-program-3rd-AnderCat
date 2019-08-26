<?php
require_once('./conn.php');
require_once('./handle_verify.php');
require_once('./count_page.php');
?>

<!DOCTYPE html>
<html>
<head>
	<title>留言板</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="./message_board.css" charset="utf-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	<script type="text/javascript" async src="./message_board.js"></script>
</head>
<body>
	<nav class="navbar navbar-dark bg-primary">
		<a href="./index.php" class="home" style="text-decoration: none;">留言板</a>
		<div class='form-line my-2 my-lg-0'>
		<?php
		if (isset($username) && !empty($username)) {
		    echo "<div class='hello'>你好 ,".$username . "</div>";
		    echo "<a href='./logout.php' style='text-decoration:none' class='right'> 登出</a>";
		} else {
			echo "<a href='./login.php' style='text-decoration:none;'>登入 </a>";
			echo "<a href='./register.php' style='text-decoration:none;'>註冊</a>";
		}?>
		</div>
	</nav>


	<div class="container col-6">	
		<div class="warning" color="black">「本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼」 </div>
		<form method="POST" action="./handle_post.php" class="post col-12" >
			<input type="hidden" value="0" name="parent_id">
			<textarea type="textarea" name="message" class="user_message" placeholder="留言"></textarea>
			<?php
				if (isset($username) && !empty($username)) {
					echo "<button class='message_btn btn btn-primary' type='submit'>送出</button>";
				} else {
				echo "<div>登入後可以留言</div>";
				}
			?>
		</form>
		<div class="board_comment"> </div>
		<input type="hidden" class="edit_message edit_submit">
		<?php
		  $stmt = $conn->prepare("SELECT c.username,c.id,c.comment, c.created_at, users.nickname FROM AnderCat_comments as c LEFT JOIN AnderCat_users as users ON c.username = users.username WHERE c.parent_id = 0 ORDER BY c.id DESC LIMIT ?,?");
		  $stmt->bind_param("ss",$start,$per);
		  $stmt->execute();
		  $result = $stmt->get_result();
		  if ($result->num_rows > 0) {
		  	while($row = $result->fetch_assoc()) {
		  		?>
		  		<div class="comments col-12">
		  			<div class="comment">
						<div class="name">
							<h3 class="mainName"><?php echo htmlspecialchars($row['nickname'],ENT_QUOTES, 'utf-8'); ?></h3>
							<span class="time"><?php echo $row['created_at'];?></span>
						</div>
						<div >
						<?php
							if (isset($username) && !empty($username) && $username === $row['username']) {
								?>
								<div class="right">
									<button class="edit btn btn-success" >編輯</button>
									<button onclick="return confirm('確定要刪除嗎?');" class="delete_btn btn btn-success" name= '<?php echo $row['id']; ?>' href= '<?php echo"handle_delete.php?id=" . $row['id']; ?>'>刪除</button>
								</div>
								<?php
							}
							?>
						<pre><?php echo htmlspecialchars($row['comment'],ENT_QUOTES, 'utf-8');?></pre>
						</div>
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
								<h3><?php echo htmlspecialchars($sub_row['nickname'],ENT_QUOTES, 'utf-8'); ?></h3>
							<span class="time"><?php echo $sub_row['created_at'];?></span>
							</div>
							<div>
								<?php
									if (isset($username) && !empty($username) && $username === $sub_row['username']) {
									?>
										<div class="right">
											<button class="sub_edit_btn btn btn-success" href= ' <?php echo "edit.php?id=" . $sub_row['id'];?>'>編輯 </button>
											<button class="sub_delete_btn btn btn-success"  onclick="return confirm('確定要刪除嗎?');" name= "<?php echo $sub_row['id']; ?>" href= '<?php echo"handle_delete.php?id=" . $sub_row['id']; ?>'> 刪除</button>
										</div>
								<?php
								}
							?>
										<pre><?php echo htmlspecialchars($sub_row['comment'],ENT_QUOTES, 'utf-8');?></pre>
							</div>
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
							if (isset($username) && !empty($username)) {
								echo "<button class='sub_message_btn btn btn-primary'>送出</button>";
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
