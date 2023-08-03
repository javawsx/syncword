import {
  doGetTopicList,
  doFaqTopicAdd,
  doFaqTopicEdit,
  doFaqTopicDelete,
} from '../axios/faq.api.js'
import { alertSuccess, alertLinkAfterSuccess } from '../axios/alerts.js'

var faqTopicTable
$(document).ready(function () {
  doGetTopicList()
    .then(function (response) {
      faqTopicTable = new DataTable('#faqTopicTables', {
        data: response.data.result,
        columns: [
          { data: 'id' },
          { data: 'title' },
          { data: 'section' },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-success editFaqTopic' data-bs-toggle='modal' id='editFaqTopic' data-bs-target='#editFaqTopicModal'>" +
              "<i class='ri-pencil-fill fs-16'></i> Edit" +
              '</button>' +
              '</div>',
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-danger deleteFaqTopic' data-bs-toggle='modal' id='deleteFaqTopic' data-bs-target='#deleteFaqTopicModel'>" +
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

// 点击事件渲删除问题主题界面下拉框
$('#faqTopicTables tbody').on('click', '.deleteFaqTopic', function () {
  var faqTopic = faqTopicTable.row($(this).parents('tr')).data()
  // 设置初始值
  document.getElementById('deleteId').value = faqTopic.id
})

// 点击事件渲染修改问题主题界面
$('#faqTopicTables tbody').on('click', '.editFaqTopic', function () {
  var faqTopic = faqTopicTable.row($(this).parents('tr')).data()
  // 设置初始值
  document.getElementById('editId').value = faqTopic.id
  document.getElementById('editTitle').value = faqTopic.title
  document.getElementById('editSection').value = faqTopic.section
})

// 新增问题主题
document.querySelector('#add-btn').addEventListener('click', function () {
  var title = document.getElementById('Title').value
  var section = document.getElementById('Section').value
  doFaqTopicAdd({
    title: title,
    section: section,
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

// 修改问题主题
document.querySelector('#edit-btn').addEventListener('click', function () {
  var id = document.getElementById('editId').value
  var title = document.getElementById('editTitle').value
  var section = document.getElementById('editSection').value
  doFaqTopicEdit({
    id: id,
    title: title,
    section: section,
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

// 删除问题主题
document.querySelector('#delete-btn').addEventListener('click', function () {
  var id = document.getElementById('deleteId').value
  doFaqTopicDelete({
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
