let list = [];
let listId = 0;
function render() {
  $('.todo-list').empty();
  $('.todo-list').append(list.map(item => (item.check ? `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-success" id="${item.id}">
    <div>
      <input type="checkbox" class="check-btn" checked="checked">
      <label class="s delete-line">${item.content}</label>
    </div>
    <div>
      <button type="button" class="btn btn-danger">刪除</button>
    </div>
  </li>`
    : `<li class="list-group-item d-flex justify-content-between align-items-center" id="${item.id}">
    <div>
      <input type="checkbox" class="check-btn">
      <label class="s">${item.content}</label>
    </div>
    <div>
      <button type="button" class="btn btn-danger">刪除</button>
    </div>
  </li>`)));
}

function addTodo(value) {
  listId += 1;
  list.push({ content: value, id: listId, check: false });
  $('.add-todo').val('');
  render();
}

function removeTodo(dataId) {
  list = list.filter(item => item.id !== dataId);
  render();
}

/* eslint-disable no-param-reassign */
function checkTodo(dataId) {
  list.forEach((item) => {
    if (item.id === dataId) {
      item.check = !item.check;
    }
  });
  render();
}
/* eslint-enable no-param-reassign */

$(document).ready(() => {
  $('.add-todo').keydown((e) => {
    if (e.target.value === '') {
      e.stopPropagation();
    } else if (e.key === 'Enter') {
      addTodo(e.target.value);
    }
  });

  $('.row').click((e) => {
    const element = e.target;
    switch (element.innerText) {
      case '新增':
        if (($('.add-todo').val() !== '')) {
          addTodo($('.add-todo').val());
        }
        break;
      case '刪除':
        removeTodo(e);
        break;
      default:
        break;
    }
  });

  $('.todo-list').change((e) => {
    const dataId = Number($(e.target).parent().parent().attr('id'));
    checkTodo(dataId);
  });
});
