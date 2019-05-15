const request = require('request');

request.get({
  url: 'https://api.twitch.tv/helix/games/top',
  headers: { 'Client-ID': '3w79wpqjzon6pu1krakmiu73h95cxc' },
},
(error, response, body) => {
  const games = JSON.parse(body);
  games.data.forEach((game) => {
    console.log(`${game.id} ${game.name}`);
  });
});
