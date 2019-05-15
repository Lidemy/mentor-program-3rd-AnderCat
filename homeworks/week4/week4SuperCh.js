const request = require('request');

const website = 'https://api.twitch.tv/helix/streams';

const process = require('process');

const gameName = process.argv[2];
let pagination = '';
let gameId = '';

function getStreamsContinue() {
  request.get({
    url: `${website}?first=100&game_id=${gameId}&after=${pagination}`,
    headers: { 'Client-ID': '3w79wpqjzon6pu1krakmiu73h95cxc' },
  },
  (error, response, body) => {
    const games = JSON.parse(body);
    games.data.forEach(game => console.log(`ID:${game.id} 標題:${game.title}`));
  });
}

function getStreams() {
  request.get({
    url: `${website}?first=100&game_id=${gameId}`,
    headers: { 'Client-ID': '3w79wpqjzon6pu1krakmiu73h95cxc' },
  },
  (error, response, body) => {
    const games = JSON.parse(body);
    if (gameId === undefined) {
      console.log('請輸入想要查詢的正確遊戲名稱');
    } else {
      console.log(`${gameName}最受歡迎的前 200 名實況台`);
      pagination = games.pagination.cursor;
      games.data.forEach(game => console.log(`ID:${game.id} 標題:${game.title}`));
      getStreamsContinue();
    }
  });
}

request.get({
  url: `https://api.twitch.tv/helix/games?name=${gameName}`,
  headers: { 'Client-ID': '3w79wpqjzon6pu1krakmiu73h95cxc' },
},
(error, response, body) => {
  const games = JSON.parse(body);
  [gameId] = games.data.map(game => game.id);
  getStreams();
});
