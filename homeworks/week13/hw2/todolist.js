function getHtml(value) {
  return `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div>
      <input type="checkbox" class="check-btn">
      <label class="s">${value}</label>
    </div>
    <div>
      <button type="button" class="btn btn-danger">刪除</button>
    </div>
  </li>`;
}

function addTodo(value) {
  const todoInput = getHtml(value);
  $('.add-todo').val('');
  $('.todo-list').append(todoInput);
}

function boxcheck(value) {
  if (value.is(':checked')) {
    value.parent().parent().addClass('list-group-item-success');
    value.next().addClass('delete-line');
  } else {
    value.parent().parent().removeClass('list-group-item-success');
    value.next().removeClass('delete-line');
  }
}

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
        if (!($('.add-todo').val() === '')) {
          addTodo($('.add-todo').val());
        }
        break;
      case '刪除':
        $(element).parent().parent().remove();
        break;
      default:
        break;
    }
  });

  $('.todo-list').click((e) => {
    boxcheck($(e.target));
  });
});
