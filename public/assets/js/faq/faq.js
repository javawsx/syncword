import {
  doGetList,
  doGetTopicSelect,
  doFaqAdd,
  doFaqEdit,
  doFaqDelete,
} from '../axios/faq.api.js'
import { alertSuccess, alertLinkAfterSuccess } from '../axios/alerts.js'

var faqTable
var selectData
$(document).ready(function () {
  doGetList()
    .then(function (response) {
      faqTable = new DataTable('#faqTables', {
        data: response.data.result,
        columns: [
          { data: 'id' },
          { data: 'faq_topic_id' },
          { data: 'title' },
          { data: 'content' },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-success editFaq' data-bs-toggle='modal' id='editFaq' data-bs-target='#editFaqModal'>" +
              "<i class='ri-pencil-fill fs-16'></i> Edit" +
              '</button>' +
              '</div>',
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-danger deleteFaq' data-bs-toggle='modal' id='deleteFaq' data-bs-target='#deleteFaqModel'>" +
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
  doGetTopicSelect()
    .then(function (response) {
      selectData = response.data.result
    })
    .catch(function (error) {
      console.log(error)
    })
})

// 点击事件渲删除常规问题界面下拉框
$('#faqTables tbody').on('click', '.deleteFaq', function () {
  var faq = faqTable.row($(this).parents('tr')).data()
  // 设置初始值
  document.getElementById('deleteId').value = faq.id
})

// 点击事件渲染增加常规问题界面下拉框
document.querySelector('#addFaq').addEventListener('click', function () {
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#addFaqModal'),
  })
})

// 点击事件渲染修改常规问题界面下拉框
$('#faqTables tbody').on('click', '.editFaq', function () {
  var faq = faqTable.row($(this).parents('tr')).data()
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#editFaqModal'),
  })

  // 设置初始值
  document.getElementById('editFaqId').value = faq.id
  $('#editFaqTopicId').val(faq.faq_topic_id)
  $('#editFaqTopicId').trigger('change')
  document.getElementById('editTitle').value = faq.title
  document.getElementById('editContent').value = faq.content
})

// 新增常规问题
document.querySelector('#add-btn').addEventListener('click', function () {
  var faq_topic_id = document.getElementById('FaqTopicId').value
  var title = document.getElementById('Title').value
  var content = document.getElementById('Content').value
  doFaqAdd({
    faq_topic_id: faq_topic_id,
    title: title,
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

// 修改常规问题
document.querySelector('#edit-btn').addEventListener('click', function () {
  var id = document.getElementById('editFaqId').value
  var faq_topic_id = document.getElementById('editFaqTopicId').value
  var title = document.getElementById('editTitle').value
  var content = document.getElementById('editContent').value
  doFaqEdit({
    id: id,
    faq_topic_id: faq_topic_id,
    title: title,
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

// 删除常规问题
document.querySelector('#delete-btn').addEventListener('click', function () {
  var id = document.getElementById('deleteId').value
  doFaqDelete({
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
