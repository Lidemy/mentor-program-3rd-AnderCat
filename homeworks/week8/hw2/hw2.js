const main = document.querySelector('.messeage-board');
const btn = document.querySelector('.btn');
function get() {
  const request = new XMLHttpRequest();
  request.addEventListener('load', () => {
    const data = JSON.parse(request.responseText);
    for (let i = 0; i < data.length; i += 1) {
      const message = document.createElement('div');
      message.innerHTML = `
      <div class="id">#${data[i].id}</div>
      <div class="content">${data[i].content}</div>
    `;
      message.classList.add('messeage');
      main.appendChild(message);
    }
  });
  request.open('GET', 'https://lidemy-book-store.herokuapp.com/posts?_order=desc&_limit=20&_sort=id');
  request.send();
  request.onerror = () => {
    alert('系統不穩定，請再試一次');
  };
}
function post() {
  const postContent = document.querySelector('.post-text');
  const postRequest = new XMLHttpRequest();
  postRequest.addEventListener('load', () => get());
  postRequest.open('POST', 'https://lidemy-book-store.herokuapp.com/posts', true);
  postRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  postRequest.send(`content=${encodeURIComponent(postContent.value)}`);
  postRequest.onerror = () => {
    alert('系統不穩定，請再試一次');
  };
}
get();

btn.addEventListener('click', () => {
  post();
  alert('留言成功');
});
