const body = document.querySelector('body');
const btn = document.querySelector('.btn');
const scoreArr = document.querySelector('.score-arr');
let startTime = 0;
let endTime = 0;
let game = false;
const time = Math.floor(Math.random() * 2000) + 1000;
const color = '0123456789ABCDEF';
let bg = '';
let changeTime;
const score = [];
function randomColor() {
  bg = '#';
  color.split('');
  for (let i = 0; i < 6; i += 1) {
    bg += color[Math.floor(Math.random() * 16)];
  }
}
function gameStart(e) {
  game = true;
  body.style.background = 'white';
  startTime = new Date();
  randomColor();
  changeTime = setTimeout(() => { body.style.background = bg; }, time);
  e.stopPropagation();
  btn.classList.toggle('hide__btn');
}
function clickAgain() {
  btn.classList.toggle('hide__btn');
  btn.innerText = '再來一次';
  game = false;
}
function scoreCal(scoreTime) {
  score.push(scoreTime);
  score.sort((a, b) => a - b);
  scoreArr.innerText = '';
  if (score.length > 3) {
    score.pop(-1);
  }
  for (let i = 0; i < score.length; i += 1) {
    scoreArr.innerText += `${i + 1}. ${score[i]} 秒 \n`;
  }
}
function clickItem() {
  endTime = new Date();
  if (game) {
    if (endTime - startTime - time < 0) {
      alert('還沒變色喔! 失敗');
      clickAgain();
      clearTimeout(changeTime);
    } else {
      alert(`你的成績 : ${((endTime - startTime - time) / 1000).toFixed(2)}秒 `);
      clickAgain();
      scoreCal(((endTime - startTime - time) / 1000).toFixed(2));
    }
  }
}
body.addEventListener('click', () => {
  clickItem();
});
body.addEventListener('keydown', (e) => {
  if (e.keyCode === 32) {
    clickItem();
  }
  if (e.keyCode === 82) {
    gameStart(e);
  }
});

btn.addEventListener('click', (e) => {
  gameStart(e);
});
