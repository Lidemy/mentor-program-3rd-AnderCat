const request = require('request');

const website = 'https://api.twitch.tv/helix/streams';

const process = require('process');

let gameName = '';
for (let i = 2; i < process.argv.length; i += 1) {
  gameName += `${process.argv[i]} `;
}
let gameId = '';

function getStreams() {
  request.get({
    url: `${website}?first=100&game_id=${gameId}`,
    headers: { 'Client-ID': '3w79wpqjzon6pu1krakmiu73h95cxc' },
  },
  (error, response, body) => {
    const games = JSON.parse(body);
    console.log(`${gameName}最受歡迎的前 100 名實況台`);
    games.data.forEach(game => console.log(`ID:${game.id} 標題:${game.title}`));
  });
}

request.get({
  url: `https://api.twitch.tv/helix/games?name=${gameName}`,
  headers: { 'Client-ID': '3w79wpqjzon6pu1krakmiu73h95cxc' },
},
(error, response, body) => {
  const games = JSON.parse(body);
  gameId += games.data.map(game => game.id)[0];
  getStreams();
});
