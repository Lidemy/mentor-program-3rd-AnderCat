<?php 
  require_once('./conn.php');
  
  function getAllTodo(){
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM todolist");
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $arr = [];
      while($row = $result->fetch_assoc()) {
         $response = (object) [
           'id' => $row['id'],
           'content' => $row['content'],
           'done' => $row['done'],
         ];
         array_push($arr, $response);
      }
      echo json_encode($arr, JSON_PRETTY_PRINT ^ JSON_UNESCAPED_UNICODE);
    } else {
      echo json_encode(array(
        'result' => 'fail'
      ), JSON_UNESCAPED_UNICODE);
    }
  }

  function getTodo($id) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM todolist as t where t.id = ?");
    $stmt->bind_param("i",$id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
      	echo json_encode(array(
          'result' => 'success',
          'content' => $row['content'],
          'id' => $row['id'],
        ));
      }
    } else {
      echo json_encode(array(
        'result' => 'fail'
      ));
    }
  }

  function deleteTodo($id) {
    global $conn;
    $stmt = $conn->prepare("DELETE FROM todolist where id = ?");
    $stmt->bind_param("i",$id);
    
    if ($stmt->execute()) {
      echo json_encode(array(
        'result' => 'success'
      ));
    } else {
      echo json_encode(array(
        'result' => 'fail'
      ));
    }
  }
  
  function updateTodo($content,$id) {
    global $conn;
    $stmt = $conn->prepare("UPDATE todolist SET content = ? where id = ?");
    $stmt->bind_param("si", $content, $id);
    
    if ($stmt->execute()) {
      echo json_encode(array(
        'result' => 'success'
      ));
    } else {
      echo json_encode(array(
        'result' => 'fail'
      ));
    } 
  }
  
  function updateStatus($id) {
    global $conn;
    $stmt = $conn->prepare("UPDATE todolist SET done = !done where id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
      echo json_encode(array(
        'result' => 'success'
      ));
    } else {
      echo json_encode(array(
        'result' => 'fail'
      ));
    } 
  }

  function addTodo($content) {
    global $conn;
    $bool = true;
    $stmt = $conn->prepare("INSERT INTO todolist(`content`,`done`) VALUES (?,?)");
    $stmt->bind_param("si", $content,$bool);
    if ($stmt->execute()) {
      echo json_encode(array(
        'result' => 'success'
      ));
    } else {
      echo json_encode(array(
        'result' => 'fail'
      ));
    }
  }
?>
