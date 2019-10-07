const baseURL = '/todolist/todo_method.php';
function render(res) {
  $('.todo-list').empty();
  $('.todo-list').append(res.map(item => (item.done
    ? `<li class="list-group-item d-flex justify-content-between align-items-center" id="${item.id}">
    <div>
      <input type="checkbox" class="check-btn">
      <label class="content">${item.content}</label>
    </div>
    <div>
      <button type="button" class="btn btn-success">編輯</button>
      <button type="button" class="btn btn-danger">刪除</button>
    </div>
  </li>`
    : `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-success" id="${item.id}">
    <div>
      <input type="checkbox" class="check-btn" checked="checked">
      <label class="s delete-line">${item.content}</label>
    </div>
    <div>
      <button type="button" class="btn btn-danger">刪除</button>
    </div>
  </li>`)));
}

function GetAllTodo() {
  $.ajax({
    type: 'GET',
    url: baseURL,
  }).done((resp) => {
    const res = JSON.parse(resp);
    render(res);
  });
}

function addTodo(value) {
  $.ajax({
    type: 'POST',
    url: baseURL,
    data: {
      content: value,
    },
  }).done(() => {
    $('.add-todo').val('');
    GetAllTodo();
  });
}

function removeTodo(dataId) {
  $.ajax({
    type: 'DELETE',
    url: `${baseURL}?id=${dataId}`,
  }).done(() => {
    GetAllTodo();
  });
}

function checkTodo(dataId) {
  $.ajax({
    type: 'PATCH',
    url: `${baseURL}?id=${dataId}`,
  }).done(() => {
    GetAllTodo();
  });
}

function updateTodo(dataId, value) {
  $.ajax({
    type: 'PATCH',
    url: `${baseURL}?id=${dataId}`,
    data: {
      content: value,
    },
  }).done(() => {
    GetAllTodo();
  });
}

function editTodo(e, message) {
  $(e.target).parent().prev().children('.content')
    .html(
      `<input type="text" class="form-control edit-todo"  aria-label="todo" value="${message}">`,
    );
  $(e.target).html('送出');
}

$(document).ready(() => {
  GetAllTodo();
  $('.add-todo').keydown((e) => {
    if (e.target.value === '') {
      e.stopPropagation();
    } else if (e.key === 'Enter') {
      addTodo(e.target.value);
    }
  });

  $('.row').click((e) => {
    const element = e.target;
    const dataId = Number($(e.target).closest('.list-group-item').attr('id'));
    switch (element.innerHTML) {
      case '新增':
        if (($('.add-todo').val() !== '')) {
          const content = $('.add-todo').val();
          addTodo(content);
        }
        break;

      case '刪除':
        removeTodo(dataId);
        break;

      case '編輯': {
        const message = $(e.target).parent().prev().children('.content')
          .text();
        editTodo(e, message);
        break;
      }

      case '送出': {
        const content = $('.edit-todo').val();
        updateTodo(dataId, content);
        break;
      }

      default:
        break;
    }
  });

  $('.todo-list').change((e) => {
    if ($(e.target).hasClass('check-btn')) {
      const dataId = Number($(e.target).parent().parent().attr('id'));
      checkTodo(dataId);
    }
  });
});
