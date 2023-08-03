import {
  doGetServerList,
  doGetGameSelect,
  doServerAdd,
  doServerEdit,
  doServerDelete,
} from '../axios/game.api.js'
import { alertSuccess, alertLinkAfterSuccess } from '../axios/alerts.js'

var gameServerTable
var selectData
$(document).ready(function () {
  doGetServerList()
    .then(function (response) {
      gameServerTable = new DataTable('#serverDataTables', {
        data: response.data.result,
        columns: [
          { data: 'id' },
          { data: 'game_id' },
          { data: 'server_id' },
          { data: 'server_name' },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-success editServer' data-bs-toggle='modal' id='editServer' data-bs-target='#editServerModal'>" +
              "<i class='ri-pencil-fill fs-16'></i> Edit" +
              '</button>' +
              '</div>',
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-danger deleteServer' data-bs-toggle='modal' id='deleteServer' data-bs-target='#deleteServerModel'>" +
              "<i class='ri-delete-bin-2-line'></i> Delete" +
              '</button>' +
              '</div>',
          },
        ],
        select: {
          style: 'os',
          blurable: true,
        },
      })
    })
    .catch(function (error) {
      console.log(error)
    })

  // 加载下拉框数据
  doGetGameSelect()
    .then(function (response) {
      selectData = response.data.result
    })
    .catch(function (error) {
      console.log(error)
    })
})

// 点击事件渲删除服务器界面下拉框
$('#serverDataTables tbody').on('click', '.deleteServer', function () {
  var server = gameServerTable.row($(this).parents('tr')).data()
  // 设置初始值
  document.getElementById('deleteId').value = server.id
})

// 点击事件渲染增加服务器界面下拉框
document.querySelector('#addServer').addEventListener('click', function () {
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#addServerModal'),
  })
})

// 点击事件渲染修改服务器界面下拉框
$('#serverDataTables tbody').on('click', '.editServer', function () {
  var server = gameServerTable.row($(this).parents('tr')).data()
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#editServerModal'),
  })

  // 设置初始值
  document.getElementById('editId').value = server.id
  $('#editGameId').val(server.game_id)
  $('#editGameId').trigger('change')
  document.getElementById('editServerName').value = server.server_name
  document.getElementById('editServerId').value = server.server_id
})

// 新增游戏服务器
document.querySelector('#add-btn').addEventListener('click', function () {
  var game_id = document.getElementById('GameId').value
  var server_name = document.getElementById('ServerName').value
  var server_id = document.getElementById('ServerId').value
  doServerAdd({
    game_id: game_id,
    server_id: server_id,
    server_name: server_name,
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

// 修改游戏服务器
document.querySelector('#edit-btn').addEventListener('click', function () {
  var id = document.getElementById('editId').value
  var game_id = document.getElementById('editGameId').value
  var server_name = document.getElementById('editServerName').value
  var server_id = document.getElementById('editServerId').value
  doServerEdit({
    id: id,
    game_id: game_id,
    server_id: server_id,
    server_name: server_name,
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

// 修改游戏服务器
document.querySelector('#delete-btn').addEventListener('click', function () {
  var id = document.getElementById('deleteId').value
  doServerDelete({
    id: id,
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
