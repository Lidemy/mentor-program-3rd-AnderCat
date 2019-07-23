<?php
	require_once('./conn.php');
	if (isset($_COOKIE['verify_id']) && !empty($_COOKIE['verify_id'])){
		$idSql = "SELECT * FROM AnderCat_users_certificate WHERE id = '" . $_COOKIE['verify_id'] . "'";
		$idResult = $conn->query($idSql);
		if($idResult){
	  		while ($idRow = $idResult->fetch_assoc()) {
	   	   		$username =  $idRow['username'];
	  		}
		}
	}
?>