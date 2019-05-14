const request = require('request');

const website = 'https://api.twitch.tv/helix/streams';
const gameId = '21779';

request.get({
  url: `${website}?first=100&game_id=${gameId}`,
  headers: { 'Client-ID': '3w79wpqjzon6pu1krakmiu73h95cxc' },
},
(error, response, body) => {
  const games = JSON.parse(body);
  console.log('LOL 最受歡迎的前 100 名實況台');
  games.data.forEach(game => console.log(`ID:${game.id} 標題:${game.title}`));
});
