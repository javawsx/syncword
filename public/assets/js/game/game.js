import {
  doGetList,
  doGameAdd,
  doGameEdit,
  doGameDelete,
} from '../axios/game.api.js'
import { alertSuccess, alertLinkAfterSuccess } from '../axios/alerts.js'
const showLength = 50

var gameTable
$(document).ready(function () {
  doGetList()
    .then(function (response) {
      gameTable = new DataTable('#gameTables', {
        data: response.data.result,
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'print'],
        columns: [
          { data: 'game_id' },
          { data: 'name' },
          { data: 'category' },
          { data: 'type' },
          { data: 'price' },
          { data: 'uri' },
          { data: 'status' },
          { data: 'publisher' },
          { data: 'developer' },
          { data: 'url_pc' },
          { data: 'url_mobile' },
          {
            data: 'brief',
            // render: function (data, type, full) {
            //   if (full.brief.length > showLength) {
            //     // 显示部分信息
            //     return getPartialData(full.brief)
            //   } else {
            //     // 显示原始全部信息
            //     return full.brief
            //   }
            // },
          },
          {
            data: 'desc',
            // render: function (data, type, full) {
            //   if (full.desc.length > showLength) {
            //     // 显示部分信息
            //     return getPartialData(full.desc)
            //   } else {
            //     // 显示原始全部信息
            //     return full.desc
            //   }
            // },
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-success editGame' data-bs-toggle='modal' id='editGame' data-bs-target='#editGameModal'>" +
              "<i class='ri-pencil-fill fs-16'></i> Edit" +
              '</button>' +
              '</div>',
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-danger deleteGame' data-bs-toggle='modal' id='deleteGame' data-bs-target='#deleteGameModel'>" +
              "<i class='ri-delete-bin-2-line'></i> Delete" +
              '</button>' +
              '</div>',
          },
        ],
        select: {
          style: 'os',
          blurable: true,
        },
        // createdRow: function (row, data) {
        //   if (data.brief.length > showLength) {
        //     // 设置点击触发函数
        //     $(row)
        //       .children('td')
        //       .eq(2)
        //       .attr('onclick', 'javascript:showRemarks(this);')
        //   }
        //   $(row).children('td').eq(2).attr('content', data.brief)
        // },
      })
    })
    .catch(function (error) {
      console.log(error)
    })
})

// 点击事件跳转增加游戏界面
document.querySelector('#addGame').addEventListener('click', function () {
  window.location.href = '/game-add'
})

// 点击事件渲删除语言界面
$('#gameTables tbody').on('click', '.deleteGame', function () {
  var game = gameTable.row($(this)).data()

  // 设置初始值
  document.getElementById('deleteId').value = game.game_id
})

// 点击事件渲染修改语言界面
$('#gameTables tbody').on('click', '.editGame', function () {
  var game = gameTable.row($(this)).data()

  // 设置初始值
  document.getElementById('editGameId').value = game.game_id
  document.getElementById('editGameName').value = game.name
  document.getElementById('editCategory').value = game.category
  document.getElementById('editType').value = game.type
  document.getElementById('editPrice').value = game.price
  document.getElementById('editUri').value = game.uri
  document.getElementById('editStatus').value = game.status
  document.getElementById('editPublisher').value = game.publisher
  document.getElementById('editDeveloper').value = game.developer
  document.getElementById('editBrief').value = game.brief
  document.getElementById('editDesc').value = game.desc
  document.getElementById('editUrlPC').value = game.url_pc
  document.getElementById('editUrlMobile').value = game.url_mobile
})

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
      alertSuccess({
        message: response.data.message,
      })
    })
    .catch(function (error) {
      console.log(error)
    })
})

// 修改游戏
document.querySelector('#edit-btn').addEventListener('click', function () {
  var game_id = document.getElementById('editGameId').value
  var name = document.getElementById('editGameName').value
  var category = document.getElementById('editCategory').value
  var type = document.getElementById('editType').value
  var price = document.getElementById('editPrice').value
  var uri = document.getElementById('editUri').value
  var status = document.getElementById('editStatus').value
  var publisher = document.getElementById('editPublisher').value
  var developer = document.getElementById('editDeveloper').value
  var brief = document.getElementById('editBrief').value
  var desc = document.getElementById('editDesc').value
  var url_pc = document.getElementById('editUrlPC').value
  var url_mobile = document.getElementById('editUrlMobile').value
  doGameEdit({
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
      alertSuccess({
        message: response.data.message,
      })
    })
    .catch(function (error) {
      console.log(error)
    })
})

// 删除游戏
document.querySelector('#delete-btn').addEventListener('click', function () {
  var game_id = document.getElementById('deleteId').value
  doGameDelete({
    game_id: game_id,
  })
    .then(function (response) {
      alertSuccess({
        message: response.data.message,
      })
    })
    .catch(function (error) {
      console.log(error)
    })
})

// 展示部分信息
function getPartialData(remarks) {
  return remarks.substr(0, showLength) + '&nbsp;&nbsp;' + '......'
}
