const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const WebTorrent = require('webtorrent');

app.get('/', function(req, res){
  res.status(200).end();
});

let path = './download';

io.on('connection', function(socket){
  let client = new WebTorrent()

  socket.on('add', uri => {

    client.on('error', function (err) {
        console.error('CLIENT ERROR: ' + err.message)
    })

    client.add(uri, { path }, (torrent) => {
        torrent.on('error', err => {
            console.log('TORRENT ERROR:' + err.message)
        })
    })
  });

  socket.on('pause', () => {
    client.torrents.forEach(torrent => {
      torrent.pause();
    });
  });

  socket.on('resume', () => {
    client.torrents.forEach(torrent => {
      torrent.resume();
    });
  });

  setInterval(() => {
    const update = [];
    client.torrents.forEach(torrent => {
      update.push({
        name: torrent.name,
        size: prettyBytes(torrent.length), 
        speedDown: `${prettyBytes(torrent.downloadSpeed)}/s`, 
        speedUp: `${prettyBytes(torrent.uploadSpeed)}/s`, 
        progress: `${(torrent.progress * 100).toFixed(1)}%`, 
        peers: `${torrent.numPeers}`, 
        time: convertTime(Math.ceil(torrent.timeRemaining / 1000)),
      });
    });
    socket.emit('update', update);
  }, 2000)

  socket.on('change path', p => {
    path = p
  });
});

http.listen(3001, function(){
  console.log('listening on *:3000');
});

const prettyBytes = num => {
  let exponent
  let unit
  let neg = num < 0
  let units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  if (neg) num = -num

  if (num < 1) return (neg ? '-' : '') + num + ' B'

  exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
  num = Number((num / Math.pow(1000, exponent)).toFixed(2))
  unit = units[exponent]

  return (neg ? '-' : '') + num + ' ' + unit
}

const convertTime = time => {
  let hours = '';
  let minutes = '';

  if ((time / 3600) > 0) {
    hours = `${Math.ceil(time / 3600)}H`;
    time = time % 3600
  }

  if ((time / 60) > 0) {
    minutes = ` ${Math.ceil(time / 60)}min`;
    time = time % 60;
  }

  return `${hours}${minutes} ${time}s`;
}

// magnet:?xt=urn:btih:4d753474429d817b80ff9e0c441ca660ec5d2450&dn=Ubuntu+14.04+64+bit&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337
// http://releases.ubuntu.com/18.04/ubuntu-18.04.2-desktop-amd64.iso.torrent
// magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent