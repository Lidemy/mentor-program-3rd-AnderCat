const request = new XMLHttpRequest();
const wrapper = document.querySelector('.wrapper');
const background = document.querySelector('html');
const btn = document.querySelector('.body');

function lottery() {
  request.addEventListener('load', () => {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText);
      if (data.prize === 'FIRST') {
        wrapper.innerText = '恭喜你中頭獎了！日本東京來回雙人遊！';
        wrapper.classList.add('img-plane');
        background.style.background = '#b6ecf2';
      } else if (data.prize === 'SECOND') {
        wrapper.innerText = '二獎！90 吋電視一台！';
        wrapper.classList.add('img-tv');
      } else if (data.prize === 'THIRD') {
        wrapper.innerText = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
        wrapper.classList.add('img-youtube');
      } else if (data.prize === 'NONE') {
        wrapper.innerText = '銘謝惠顧';
        wrapper.style.color = 'white';
        background.style.background = 'black';
      }
    } else {
      alert('系統不穩定，請再試一次');
    }
  });
  request.onerror = () => {
    alert('系統不穩定，請再試一次');
  };
  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
  request.send();
}

btn.addEventListener('click', () => {
  lottery();
});
