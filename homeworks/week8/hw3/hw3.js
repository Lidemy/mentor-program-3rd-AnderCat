const request = new XMLHttpRequest();
const stream = document.createElement('div');
const wrapper = document.querySelector('.wrapper');
request.open('GET', 'https://api.twitch.tv/kraken/streams/?client_id=3w79wpqjzon6pu1krakmiu73h95cxc&game=League%20of%20Legends', true);
request.send();
request.addEventListener('load', () => {
  const response = request.responseText;
  const json = JSON.parse(response);
  for (let i = 0; i < json.streams.length; i += 1) {
    stream.innerHTML += `
  <div class="box" style="cursor:pointer;"onclick="location.href='${json.streams[i].channel.url}';">
    <img src='${json.streams[i].preview.large}' class = "preview">
    <div class="stream-title">
      <img src='${json.streams[i].channel.logo}' class = "img">
      <div class="stream-name">
        ${json.streams[i].channel.status}</br>
        ${json.streams[i].channel.display_name}
      </div>
    </div>
  </div>`;
  }
  wrapper.appendChild(stream);
});
request.onerror = () => {
  alert('系統不穩定，請再試一次');
};
