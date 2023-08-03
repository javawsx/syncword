import {
  doGetNewsList,
  doNewsAdd,
  doNewsEdit,
  doNewsDelete,
} from './axios/news.api.js'
import { doGetGameSelect } from './axios/game.api.js'
import { alertSuccess, alertLinkAfterSuccess } from './axios/alerts.js'

var newsTable
var selectData
$(document).ready(function () {
  doGetNewsList()
    .then(function (response) {
      newsTable = new DataTable('#newsDataTables', {
        data: response.data.result,
        columns: [
          { data: 'id' },
          { data: 'game_id' },
          { data: 'title' },
          { data: 'author' },
          { data: 'content' },
          { data: 'timestamp' },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-success editNews' data-bs-toggle='modal' id='editNews' data-bs-target='#editNewsModal'>" +
              "<i class='ri-pencil-fill fs-16'></i> Edit" +
              '</button>' +
              '</div>',
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-danger deleteNews' data-bs-toggle='modal' id='deleteNews' data-bs-target='#deleteNewsModel'>" +
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

// 点击事件渲删除商品界面下拉框
$('#newsDataTables tbody').on('click', '.deleteNews', function () {
  var News = newsTable.row($(this).parents('tr')).data()
  // 设置初始值
  document.getElementById('deleteId').value = News.id
})

// 点击事件渲染增加商品界面下拉框
document.querySelector('#addNews').addEventListener('click', function () {
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#addNewsModal'),
  })
})

// 点击事件渲染修改商品界面下拉框
$('#newsDataTables tbody').on('click', '.editNews', function () {
  var News = newsTable.row($(this).parents('tr')).data()
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#editNewsModal'),
  })

  // 设置初始值
  document.getElementById('editId').value = News.id
  document.getElementById('editGameId').value = News.game_id
  document.getElementById('editTitle').value = News.title
  document.getElementById('editAuthor').value = News.author
  document.getElementById('editContent').value = News.content
})

// 新增游戏商品
document.querySelector('#add-btn').addEventListener('click', function () {
  var id = document.getElementById('ID').value
  var game_id = document.getElementById('GameId').value
  var author = document.getElementById('Author').value
  var content = document.getElementById('Content').value
  var title = document.getElementById('Title').value
  doNewsAdd({
    id: id,
    game_id: game_id,
    title: title,
    author: author,
    content: content,
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

// 修改商品
document.querySelector('#edit-btn').addEventListener('click', function () {
  var id = document.getElementById('editId').value
  var game_id = document.getElementById('editGameId').value
  var author = document.getElementById('editAuthor').value
  var content = document.getElementById('editContent').value
  var title = document.getElementById('editTitle').value

  doNewsEdit({
    id: id,
    game_id: game_id,
    title: title,
    author: author,
    content: content,
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

// 删除商品
document.querySelector('#delete-btn').addEventListener('click', function () {
  var id = document.getElementById('deleteId').value
  doNewsDelete({
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
