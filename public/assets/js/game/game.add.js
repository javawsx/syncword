import { doGameAdd } from '../axios/game.api.js'
import { alertSuccess, alertLinkAfterSuccess } from '../axios/alerts.js'

// 新增游戏
document.querySelector('#add-btn').addEventListener('click', function () {
  var game_id = document.getElementById('GameId').value
  var name = document.getElementById('GameName').value
  var category = document.getElementById('Category').value
  var type = document.getElementById('Type').value
  var price = document.getElementById('Price').value
  var uri = document.getElementById('Uri').value
  var status = document.getElementById('Status').value
  var publisher = document.getElementById('Publisher').value
  var developer = document.getElementById('Developer').value
  var brief = document.getElementById('Brief').value
  var desc = document.getElementById('Desc').value
  var url_pc = document.getElementById('UrlPC').value
  var url_mobile = document.getElementById('UrlMobile').value
  doGameAdd({
    game_id: game_id,
    name: name,
    category: category,
    type: type,
    price: price,
    uri: uri,
    status: status,
    publisher: publisher,
    developer: developer,
    brief: brief,
    desc: desc,
    url_pc: url_pc,
    url_mobile: url_mobile,
  })
    .then(function (response) {
      alertLinkAfterSuccess({
        message: response.data.message,
        link: '/game',
      })
    })
    .catch(function (error) {
      console.log(error)
    })
})
