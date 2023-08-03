import {
  doGetCodeList,
  doGetPackSelect,
  doCodeAdd,
  doCodeEdit,
  doCodeDelete,
} from '../axios/pack.api.js'
import { alertSuccess, alertError } from '../axios/alerts.js'

var packCodeTable
var selectData
$(document).ready(function () {
  // 渲染table
  doGetCodeList()
    .then(function (response) {
      packCodeTable = new DataTable('#packCodeTables', {
        data: response.data.result,
        columns: [
          { data: 'id' },
          { data: 'pack_id' },
          { data: 'code' },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-success editPackCode' data-bs-toggle='modal' id='editPackCode' data-bs-target='#editPackCodeModal'>" +
              "<i class='ri-pencil-fill fs-16'></i> Edit" +
              '</button>' +
              '</div>',
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-danger deletePackCode' data-bs-toggle='modal' id='deletePackCode' data-bs-target='#deletePackCodeModel'>" +
              "<i class='ri-delete-bin-2-line'></i> Delete" +
              '</button>' +
              '</div>',
          },
        ],
        select: {
          style: 'os',
          blurable: true,
        },
        destroy: true,
      })
    })
    .catch(function (error) {
      console.log(error)
    })

  // 加载下拉框数据
  doGetPackSelect()
    .then(function (response) {
      selectData = response.data.result
    })
    .catch(function (error) {
      console.log(error)
    })
})

// 点击事件渲删除商品界面下拉框
$('#packCodeTables tbody').on('click', '.deletePackCode', function () {
  var PackCode = packCodeTable.row($(this).parents('tr')).data()
  // 设置初始值
  document.getElementById('deleteId').value = PackCode.id
})

// 点击事件渲染增加商品界面下拉框
document.querySelector('#addPackCode').addEventListener('click', function () {
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#addPackCodeModal'),
  })
})

// 点击事件渲染修改商品界面下拉框
$('#packCodeTables tbody').on('click', '.editPackCode', function () {
  var PackCode = packCodeTable.row($(this).parents('tr')).data()
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#editPackCodeModal'),
  })

  // 设置初始值
  document.getElementById('editId').value = PackCode.id
  $('#editPackId').val(PackCode.pack_id)
  $('#editPackId').trigger('change')
  document.getElementById('editCode').value = PackCode.code
})

// 新增游戏商品
document.querySelector('#add-btn').addEventListener('click', function () {
  var pack_id = document.getElementById('PackId').value
  var code = document.getElementById('Code').value

  doCodeAdd({
    pack_id: pack_id,
    code: code,
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

// 修改游戏商品
document.querySelector('#edit-btn').addEventListener('click', function () {
  var id = document.getElementById('editId').value
  var pack_id = document.getElementById('editPackId').value
  var code = document.getElementById('editCode').value

  doCodeEdit({
    id: id,
    pack_id: pack_id,
    code: code,
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

// 修改游戏商品
document.querySelector('#delete-btn').addEventListener('click', function () {
  var id = document.getElementById('deleteId').value
  doCodeDelete({
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

// 上传文件
document.querySelector('#file-code-import').addEventListener('click', () => {
  console.log('ss')
  event.preventDefault()
  var files = event.target.files
  console.log(files)
  var fd = new FormData()
  fd.append('file', files[0])
})

// 文件upload
var previewTemplate,
  dropzone,
  dropzonePreviewNode = document.querySelector('#dropzone-preview-list'),
  inputMultipleElements =
    ((dropzonePreviewNode.id = ''),
    dropzonePreviewNode &&
      ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
      dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
      (dropzone = new Dropzone('.dropzone', {
        url: '/api/pack-code/addBatch',
        method: 'post',
        previewTemplate: previewTemplate,
        previewsContainer: '#dropzone-preview',
        addRemoveLinks: true,
        dictRemoveLinks: 'delete',
        dictCancelUpload: 'delete',
        maxFiles: 10,
        maxFilesize: 5,
        acceptedFiles: '.xlsx',
        dictResponseError: true,
        init: function () {
          this.on('success', function (file) {
            console.log('File ' + file.name + ' uploaded')
          })
          this.on('removedfile', function (file) {
            console.log('File ' + file.name + ' removed')
          })
          this.on('error', function (file, errorMessage) {
            alertError(errorMessage)
            console.log('File ' + file.name + ' upload failed')
          })
        },
      }))),
    FilePond.registerPlugin(
      FilePondPluginFileEncode,
      FilePondPluginFileValidateSize,
      FilePondPluginImageExifOrientation,
      FilePondPluginImagePreview
    ))
inputMultipleElements &&
  Array.from(inputMultipleElements).forEach(function (e) {
    FilePond.create(e)
  })
