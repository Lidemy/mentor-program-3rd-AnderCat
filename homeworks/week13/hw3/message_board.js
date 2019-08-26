function editMessage(editId, message) {
  return `
    <form method="POST" action="./handle_edit.php" class="post-subs">
      <input type="hidden" value="${editId}"name="id">
      <textarea type="textarea" name="message" class="edit_message" placeholder="留言">${message}</textarea>
      <button class='cancel btn btn-success'>取消</button>
      <button class='edit_submit btn btn-success'>送出</button>
      <input type="hidden" value="${message}"name="message">
    </form>
  `;
}
function cancel(getMessage, getEditId) {
  return `
  <div class="right">
    <button class="edit btn btn-success" name='${getEditId}' href= 'handle_edit.php?id=${getEditId}'>編輯 </button>
    <button onclick="return confirm('確定要刪除嗎?');" name='${getEditId}' class="delete_btn btn btn-success" href= 'handle_delete.php?id=${getEditId}'> 刪除</button>
  </div>
  <pre>${getMessage}</pre>
  `;
}
function deleteMessage(e) {
  const deleteId = $(e.target).attr('name');
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: 'handle_delete.php',
    data: {
      id: deleteId,
    },
  }).done((resp) => {
    const res = JSON.parse(resp);
    if (res.result === 'delete success') {
      $(e.target).closest('.comments').remove();
    }
  });
}
function deleteSubMessage(e) {
  e.preventDefault();
  const deleteId = $(e.target).attr('name');
  $.ajax({
    type: 'POST',
    url: 'handle_delete.php',
    data: {
      id: deleteId,
    },
  }).done((resp) => {
    const res = JSON.parse(resp);
    if (res.result === 'delete success') {
      $(e.target).closest('.sub-comment').remove();
    }
  });
}
function postMessage(nickname, id, time, comment) {
  return `
  <div class="comments col-12">
    <div class="comment">
      <div class="name">
        <h3 class="mainName">${nickname}</h3>
        <span class="time">${time}</span>
      </div>
      <div>
        <div class="right">
          <button class="edit btn btn-success" name='${id}' href= 'handle_edit.php?id=${id}'>編輯 </button>
          <button onclick="return confirm('確定要刪除嗎?');" name='${id}' class="delete_btn btn btn-success" href= 'handle_delete.php?id=${id}'> 刪除</button>
        </div>
        <pre>${comment}</pre>
      </div>
    </div>
    <form method="POST" action="./handle_post.php" class="post-sub">
       <h3 class="newSub">新增留言</h3>
       <input type="hidden" value="${id}"name="parent_id">
       <textarea type="textarea" name="message" class="user_sub_message" placeholder="留言"></textarea>
       <button class='sub_message_btn btn btn-primary'>送出</button>
    </form>
  </div>
  `;
}
function postSubMessage(subBackground, nickname, time, id, subComment) {
  return `
    <div class="sub-comments">
      <div class="sub-comment" style=${subBackground}>
        <div class="name">
          <h3>${nickname}</h3>
          <span class="time">${time}</span>
        </div>
        <div>
          <div class="right">
            <button class="sub_edit_btn btn btn-success" name='${id}' href= 'handle_edit.php?id=${id}'>編輯 </button>
            <button class="sub_delete_btn btn btn-success" onclick="return confirm('確定要刪除嗎?');" name= '${id}' href= 'handle_delete.php?id=${id}'> 刪除</button>
          </div>
          <pre>${subComment}</pre>
        </div>
      </div>
    </div>
  `;
}
function submitMessage(editSubmitId, editSubmitMessage) {
  return `
    <div class="right">
      <button class="edit btn btn-success" name='${editSubmitId}' href= ' edit.php?id=${editSubmitId}'>編輯 </button>
      <button onclick="return confirm('確定要刪除嗎?');" name='${editSubmitId}' class="delete_btn btn btn-success" href= 'handle_delete.php?id=${editSubmitId}'> 刪除</button>
    </div>
    <pre>${editSubmitMessage}</pre>
  `;
}
function editSubMessage(subEditId, subEditMessage) {
  return `
    <form method="POST" action="./handle_edit.php" class="post-subs">
      <input type="hidden" value="${subEditId}"name="id">
      <textarea type="textarea" name="message" class="edit_message" placeholder="留言">${subEditMessage}</textarea>
      <button class='sub_cancel btn btn-success'>取消</button>
      <button class='sub_edit_submit btn btn-success'>送出</button>
      <input type="hidden" value="${subEditMessage}"name="message">
    </form>
  `;
}
function submitSubEdit(subEditSubmitId, subMessage) {
  return `
    <div class="right">
      <button class="sub_edit_btn btn btn-success" name='${subEditSubmitId}' href= 'handle_edit.php?id=${subEditSubmitId}'>編輯 </button>
      <button class="sub_delete_btn btn btn-success" onclick="return confirm('確定要刪除嗎?');" name= '${subEditSubmitId}' href= 'handle_delete.php?id=${subEditSubmitId}'> 刪除</button>
    </div>
    <pre>${subMessage}</pre>
  `;
}
function cancelSub(getMessage, getEditId) {
  return `
    <div class="right">
      <button class="sub_edit_btn btn btn-success" name='${getEditId}' href= 'handle_edit.php?id=${getEditId}'>編輯 </button>
      <button onclick="return confirm('確定要刪除嗎?');" name='${getEditId}' class="sub_delete_btn btn btn-success" href= 'handle_delete.php?id=${getEditId}'> 刪除</button>
    </div>
    <pre>${getMessage}</pre>
  `;
}
$(document).ready(() => {
  $('.container').on('click', 'button', (e) => {
    if ($(e.target).hasClass('edit')) { // 編輯主留言
      const editId = $(e.target).next().attr('name');
      const message = $(e.target).parent().next().text();
      $(e.target).parent().parent().html(editMessage(editId, message));
    } else if ($(e.target).hasClass('cancel')) { // 取消編輯主留言
      const getmessage = $(e.target).next().next().val();
      const geteditId = $(e.target).prev().val();
      e.preventDefault();
      $(e.target).parent().parent().html(cancel(getmessage, geteditId));
    } else if ($(e.target).hasClass('delete_btn')) { // 主留言刪除
      deleteMessage(e);
    } else if ($(e.target).hasClass('sub_delete_btn')) { // 子留言刪除
      deleteSubMessage(e);
    } else if ($(e.target).hasClass('message_btn')) { // 發送主留言
      e.preventDefault();
      const comment = $(e.target).parent().find('textarea[name=message]').val();
      const parentId = $(e.target).parent().find('input[name=parent_id]').val();
      $.ajax({
        type: 'POST',
        url: 'handle_post.php',
        data: {
          message: comment,
          parent_id: parentId,
        },
      }).done((resp) => {
        const res = JSON.parse(resp);
        if (res.result === 'success') {
          $('.board_comment').after(postMessage(res.nickname, res.id, res.time, comment));
        }
      });
    } else if ($(e.target).hasClass('sub_message_btn')) { // 發送子留言
      e.preventDefault();
      const subComment = $(e.target).parent().find('textarea[name=message]').val();
      const subParentId = $(e.target).parent().find('input[name=parent_id]').val();
      $.ajax({
        type: 'POST',
        url: 'handle_post.php',
        data: {
          message: subComment,
          parent_id: subParentId,
        },
      }).done((resp) => {
        const res = JSON.parse(resp);
        const commentName = $(e.target).closest('.comments').find('.mainName').text();
        const subBackground = commentName === res.nickname ? 'background:#ffc4c1' : '';
        if (res.result === 'success') {
          $(e.target).closest('form').before(postSubMessage(subBackground, res.nickname, res.time, res.id, subComment));
        }
      });
    } else if ($(e.target).hasClass('edit_submit')) { // 主留言編輯提交
      e.preventDefault();
      const editSubmitMessage = $(e.target).parent().find('textarea[name=message]').val();
      const editSubmitId = $(e.target).parent().find('input[name=id]').val();
      $.ajax({
        type: 'POST',
        url: 'handle_edit.php',
        data: {
          message: editSubmitMessage,
          id: editSubmitId,
        },
      }).done((resp) => {
        const res = JSON.parse(resp);
        if (res.result === 'edit success') {
          $(e.target).parent().parent().html(submitMessage(editSubmitId, editSubmitMessage));
        }
      });
    } else if ($(e.target).hasClass('sub_edit_btn')) { // 編輯子留言
      const subEditId = $(e.target).next().attr('name');
      const subEditMessage = $(e.target).parent().next().text();
      $(e.target).parent().parent().html(editSubMessage(subEditId, subEditMessage));
    } else if ($(e.target).hasClass('sub_edit_submit')) { // 子留言編輯提交
      e.preventDefault();
      const subMessage = $(e.target).parent().find('textarea[name=message]').val();
      const subEditSubmitId = $(e.target).parent().find('input[name=id]').val();
      $.ajax({
        type: 'POST',
        url: 'handle_edit.php',
        data: {
          message: subMessage,
          id: subEditSubmitId,
        },
      }).done((resp) => {
        const res = JSON.parse(resp);
        if (res.result === 'edit success') {
          $(e.target).parent().parent().html(submitSubEdit(subEditSubmitId, subMessage));
        }
      });
    } else if ($(e.target).hasClass('sub_cancel')) { // 取消編輯子留言
      e.preventDefault();
      const getMessage = $(e.target).next().next().val();
      const getEditId = $(e.target).prev().val();
      $(e.target).parent().parent().html(cancelSub(getMessage, getEditId));
    }
  });
});
