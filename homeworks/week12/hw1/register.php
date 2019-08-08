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
		<div class="nav_right">
			<a href="./login.php" style="text-decoration:none;">登入</a>
			<a href="./register.php" style="text-decoration:none;">註冊</a>
		</div>
	</nav>
	<div class="container">	
		<div class="warning" color="black">「本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼」 </div>
		<form action="./handle_register.php" method="POST">
			<div class="register">
				暱稱<br/><input type="text" name="nickname" placeholder="請輸入暱稱"><br/><br/>
				帳號<br/><input type="text" name="username" placeholder="請輸入帳號"><br/><br/>
				密碼<br/><input type="password" name="password" placeholder="請輸入密碼"><br/><br/>
				<div class="sub">
					<input type="submit" name="save" id="btn" value="註冊"> 
            	</div>
            </div>
		</form>
	</div>
</body>
</html>