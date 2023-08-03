import { doGetList, doPlayerEdit, doPlayerDelete } from '../axios/player.api.js'
var playerTable
$(document).ready(function () {
  doGetList()
    .then(function (response) {
      playerTable = new DataTable('#playerTables', {
        data: response.data.result,
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'print'],
        columns: [
          { data: 'id' },
          { data: 'email' },
          { data: 'user_name' },
          { data: 'avatar' },
          { data: 'gold' },
          { data: 'email_verified' },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-success editPlayer' data-bs-toggle='modal' id='editPlayer' data-bs-target='#editModal'>" +
              "<i class='ri-pencil-fill fs-16'></i> Edit" +
              '</button>' +
              '</div>',
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-danger deletePlayer' data-bs-toggle='modal' id='deletePlayer' data-bs-target='#deleteModal'>" +
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
})

// 点击事件渲删除玩家界面
$('#playerTables tbody').on('click', '.deletePlayer', function () {
  var player = playerTable.row($(this).parents('tr')).data()

  // 设置初始值
  document.getElementById('deleteId').value = player.id
})

// 点击事件渲染修改玩家界面
$('#playerTables tbody').on('click', '.editPlayer', function () {
  var player = playerTable.row($(this).parents('tr')).data()
  // 设置初始值
  document.getElementById('playerId').value = player.id
  document.getElementById('playerEmail').value = player.email
  document.getElementById('playerName').value = player.user_name
  document.getElementById('playerAvatar').value = player.avatar
  document.getElementById('playerGold').value = player.gold
  document.getElementById('emailVerified').value = player.email_verified
})

// 修改玩家信息
document.querySelector('#edit-btn').addEventListener('click', function () {
  var id = document.getElementById('playerId').value
  var email = document.getElementById('playerEmail').value
  var user_name = document.getElementById('playerName').value
  var avatar = document.getElementById('playerAvatar').value
  var email_verified = document.getElementById('emailVerified').value
  doPlayerEdit({
    id: id,
    email: email,
    user_name: user_name,
    avatar: avatar,
    email_verified: email_verified,
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

// 删除玩家信息
document.querySelector('#delete-btn').addEventListener('click', function () {
  var id = document.getElementById('deleteId').value
  console.log(id)
  doPlayerDelete({
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
