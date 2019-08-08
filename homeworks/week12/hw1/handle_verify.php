<?php
	require_once('./conn.php');
	if (isset($_COOKIE['verify_id']) && !empty($_COOKIE['verify_id'])){
		$idStmt = $conn->prepare("SELECT * FROM AnderCat_users_certificate WHERE id = ?");
		$idStmt->bind_param("s",$_COOKIE['verify_id']);
		$idStmt->execute();
		$idResult = $idStmt->get_result();
		if($idResult){
	  		while ($idRow = $idResult->fetch_assoc()) {
	   	   		$username =  $idRow['username'];
	  		}
		}
	}
?>