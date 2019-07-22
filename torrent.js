const WebTorrent = require('webtorrent')

const magnet = 'magnet:?xt=urn:btih:4d753474429d817b80ff9e0c441ca660ec5d2450&dn=Ubuntu+14.04+64+bit&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337'
const link = 'http://releases.ubuntu.com/18.04/ubuntu-18.04.2-desktop-amd64.iso.torrent'
const magnetUri = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

const client = new WebTorrent()

client.on('error', function (err) {
  console.error('CLIENT ERROR: ' + err.message)
})

client.add(magnetUri, { path: '.' }, (torrent) => {
  console.log(torrent.name)
  console.log(prettyBytes(torrent.length))

  torrent.on('error', err => {
    console.log('TORRENT ERROR:' + err.message)
  })

  let interval = setInterval(function () {
    console.log(`Progress: ${(torrent.progress * 100).toFixed(1)}%`)
    console.log(`Download Speed: ${prettyBytes(torrent.downloadSpeed)}/s`)
    console.log(`Peers: ${torrent.numPeers}`)
  }, 1000)

  torrent.on('done', () => {
    console.log('torrent finished downloading')
    clearInterval(interval)
  })
})

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