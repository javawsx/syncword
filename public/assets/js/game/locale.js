import {
  doGetLocaleList,
  doLocaleAdd,
  doLocaleEdit,
  doGetGameSelect,
  doLocaleDelete,
} from '../axios/game.api.js'
import { alertSuccess, alertLinkAfterSuccess } from '../axios/alerts.js'

var gameLocaleTable
var selectData
$(document).ready(function () {
  // 加载表数据
  doGetLocaleList()
    .then(function (response) {
      gameLocaleTable = new DataTable('#localeDataTables', {
        data: response.data.result,
        columns: [
          { data: 'id' },
          { data: 'game_id' },
          { data: 'locale_name' },
          { data: 'locale_id' },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-success editLocale' data-bs-toggle='modal' id='editLocale' data-bs-target='#editModal'>" +
              "<i class='ri-pencil-fill fs-16'></i> Edit" +
              '</button>' +
              '</div>',
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-danger deleteLocale' data-bs-toggle='modal' id='deleteLocale' data-bs-target='#deleteModel'>" +
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

// 点击事件渲删除语言界面
$('#localeDataTables tbody').on('click', '.deleteLocale', function () {
  var locale = gameLocaleTable.row($(this).parents('tr')).data()
  // 设置初始值
  document.getElementById('deleteId').value = locale.id
})

// 点击事件渲染增加语言界面
document.querySelector('#addLocale').addEventListener('click', function () {
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#addModal'),
  })
})

// 点击事件渲染修改语言界面
$('#localeDataTables tbody').on('click', '.editLocale', function () {
  var locale = gameLocaleTable.row($(this).parents('tr')).data()
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#editModal'),
  })

  // 设置初始值
  document.getElementById('editId').value = locale.id
  $('#editGameId').val(locale.game_id)
  $('#editGameId').trigger('change')
  document.getElementById('editLocaleName').value = locale.locale_name
  document.getElementById('editLocaleId').value = locale.locale_id
})

// 新增游戏语言
document.querySelector('#add-btn').addEventListener('click', function () {
  var game_id = document.getElementById('GameId').value
  var locale_name = document.getElementById('LocaleName').value
  var locale_id = document.getElementById('LocaleId').value
  doLocaleAdd({
    game_id: game_id,
    locale_name: locale_name,
    locale_id: locale_id,
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

// 修改游戏语言
document.querySelector('#edit-btn').addEventListener('click', function () {
  var id = document.getElementById('editId').value
  var game_id = document.getElementById('editGameId').value
  var locale_name = document.getElementById('editLocaleName').value
  var locale_id = document.getElementById('editLocaleId').value
  doLocaleEdit({
    id: id,
    game_id: game_id,
    locale_name: locale_name,
    locale_id: locale_id,
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

// 修改游戏语言
document.querySelector('#delete-btn').addEventListener('click', function () {
  var id = document.getElementById('deleteId').value
  console.log(id)
  doLocaleDelete({
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
