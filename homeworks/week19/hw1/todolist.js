const baseURL = '/todolist/todo_method.php';

function escapeHtml(content) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return content.replace(/[&<>"']/g, m => map[m]);
}

function render(res) {
  $('.todo-list').empty();
  $('.todo-list').append(res.map(item => (item.done
    ? `<li class="list-group-item d-flex justify-content-between align-items-center" id="${item.id}">
    <div>
      <input type="checkbox" class="check-btn">
      <label class="content">${escapeHtml(item.content)}</label>
    </div>
    <div>
      <button type="button" class="btn btn-success edit-btn">編輯</button>
      <button type="button" class="btn btn-danger del-btn">刪除</button>
    </div>
  </li>`
    : `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-success" id="${item.id}">
    <div>
      <input type="checkbox" class="check-btn" checked="checked">
      <label class="s delete-line">${escapeHtml(item.content)}</label>
    </div>
    <div>
      <button type="button" class="btn btn-danger">刪除</button>
    </div>
  </li>`)));
}

function getAllTodo() {
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
    getAllTodo();
  });
}

function removeTodo(dataId) {
  $.ajax({
    type: 'DELETE',
    url: `${baseURL}?id=${dataId}`,
  }).done(() => {
    getAllTodo();
  });
}

function checkTodo(dataId) {
  $.ajax({
    type: 'PATCH',
    url: `${baseURL}?id=${dataId}`,
  }).done(() => {
    getAllTodo();
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
    getAllTodo();
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
  getAllTodo();
  $('.add-todo').keydown((e) => {
    if (e.target.value === '') {
      e.stopPropagation();
    } else if (e.key === 'Enter') {
      addTodo(e.target.value);
    }
  });

  $('.row').on('click', '.add-btn', () => {
    if (($('.add-todo').val() !== '')) {
      const content = $('.add-todo').val();
      addTodo(content);
    }
  });

  $('.row').on('click', '.edit-btn', (e) => {
    const message = $(e.target).parent().prev().children('.content')
      .text();
    editTodo(e, message);
  });

  $('.row').on('click', '.del-btn', (e) => {
    const dataId = Number($(e.target).closest('.list-group-item').attr('id'));
    removeTodo(dataId);
  });

  $('.row').on('click', '.edit-todo', (e) => {
    const content = $('.edit-todo').val();
    const dataId = Number($(e.target).closest('.list-group-item').attr('id'));
    updateTodo(dataId, content);
  });

  $('.todo-list').change((e) => {
    if ($(e.target).hasClass('check-btn')) {
      const dataId = Number($(e.target).parent().parent().attr('id'));
      checkTodo(dataId);
    }
  });
});
