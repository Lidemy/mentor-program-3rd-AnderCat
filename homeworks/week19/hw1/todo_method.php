<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS,GET,POST,PATCH,DELETE,PUT');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
header('Content-Type: text/plain; charset=utf-8');
require_once('./conn.php');
require_once('./todo_api.php');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
	case 'GET':
	  if (isset($_GET['id'])) {
	  	getTodo($_GET['id']);
	  } else {
	  	getAllTodo();
	  }
	  break;

	case 'POST':
	  addTodo($_POST['content']);
	  break;

	case 'DELETE':
	  deleteTodo($_GET['id']);
	  break;

	case 'PATCH':
      parse_str(file_get_contents("php://input"), $post);
	  if (isset($post['content'])) {
	    updateTodo($post['content'],$_GET['id']);
	  } else {
	    updateStatus($_GET['id']);	
  	  }
	  break;

    case 'OPTIONS':
      header("HTTP/1.1 200 OK");
      break;

	default:
      header("HTTP/1.0 404 NOT FOUND PAGE");
	  break;
}
?>