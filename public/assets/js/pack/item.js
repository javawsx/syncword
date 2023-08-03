import {
  doGetItemList,
  doGetPackSelect,
  doItemAdd,
  doItemEdit,
  doItemDelete,
} from '../axios/pack.api.js'
import { alertSuccess, alertLinkAfterSuccess } from '../axios/alerts.js'

var packItemTable
var selectData
$(document).ready(function () {
  doGetItemList()
    .then(function (response) {
      packItemTable = new DataTable('#packItemTables', {
        data: response.data.result,
        columns: [
          { data: 'id' },
          { data: 'pack_id' },
          { data: 'name' },
          { data: 'amount' },
          { data: 'price' },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-success editPackItem' data-bs-toggle='modal' id='editPackItem' data-bs-target='#editPackItemModal'>" +
              "<i class='ri-pencil-fill fs-16'></i> Edit" +
              '</button>' +
              '</div>',
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-danger deletePackItem' data-bs-toggle='modal' id='deletePackItem' data-bs-target='#deletePackItemModel'>" +
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
  doGetPackSelect()
    .then(function (response) {
      selectData = response.data.result
    })
    .catch(function (error) {
      console.log(error)
    })
})

// 点击事件渲删除商品界面下拉框
$('#packItemTables tbody').on('click', '.deletePackItem', function () {
  var PackItem = packItemTable.row($(this).parents('tr')).data()
  // 设置初始值
  document.getElementById('deleteId').value = PackItem.id
})

// 点击事件渲染增加商品界面下拉框
document.querySelector('#addPackItem').addEventListener('click', function () {
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#addPackItemModal'),
  })
})

// 点击事件渲染修改商品界面下拉框
$('#packItemTables tbody').on('click', '.editPackItem', function () {
  var PackItem = packItemTable.row($(this).parents('tr')).data()
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#editPackItemModal'),
  })

  // 设置初始值
  document.getElementById('editId').value = PackItem.id
  $('#editPackId').val(PackItem.pack_id)
  $('#editPackId').trigger('change')
  document.getElementById('editName').value = PackItem.name
  document.getElementById('editAmount').value = PackItem.amount
  document.getElementById('editPrice').value = PackItem.price
})

// 新增游戏商品
document.querySelector('#add-btn').addEventListener('click', function () {
  var pack_id = document.getElementById('PackId').value
  var name = document.getElementById('Name').value
  var amount = document.getElementById('Amount').value
  var price = document.getElementById('Price').value

  doItemAdd({
    pack_id: pack_id,
    name: name,
    amount: amount,
    price: price,
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
  var name = document.getElementById('editName').value
  var amount = document.getElementById('editAmount').value
  var price = document.getElementById('editPrice').value

  doItemEdit({
    id: id,
    pack_id: pack_id,
    name: name,
    amount: amount,
    price: price,
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
  console.log(id)
  doItemDelete({
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
