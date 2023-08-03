import {
  doGetList,
  doPackAdd,
  doPackEdit,
  doPackDelete,
} from '../axios/pack.api.js'
import { doGetGameSelect } from '../axios/game.api.js'
import { alertSuccess, alertLinkAfterSuccess } from '../axios/alerts.js'

var packTable
var selectData
$(document).ready(function () {
  // 渲染table
  doGetList()
    .then(function (response) {
      packTable = new DataTable('#packTables', {
        data: response.data.result,
        columns: [
          { data: 'id' },
          { data: 'game_id' },
          { data: 'name' },
          { data: 'desc' },
          { data: 'price' },
          { data: 'org_price' },
          { data: 'discount' },
          { data: 'order' },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-success editPack' data-bs-toggle='modal' id='editPack' data-bs-target='#editPackModal'>" +
              "<i class='ri-pencil-fill fs-16'></i> Edit" +
              '</button>' +
              '</div>',
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-danger deletePack' data-bs-toggle='modal' id='deletePack' data-bs-target='#deletePackModel'>" +
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
  doGetGameSelect()
    .then(function (response) {
      selectData = response.data.result
    })
    .catch(function (error) {
      console.log(error)
    })
})

// 点击事件渲删除商品界面下拉框
$('#packTables tbody').on('click', '.deletePack', function () {
  var Pack = packTable.row($(this).parents('tr')).data()
  // 设置初始值
  document.getElementById('deleteId').value = Pack.id
})

// 点击事件渲染增加商品界面下拉框
document.querySelector('#addPack').addEventListener('click', function () {
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#addPackModal'),
  })
})

// 点击事件渲染修改商品界面下拉框
$('#packTables tbody').on('click', '.editPack', function () {
  var Pack = packTable.row($(this).parents('tr')).data()
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#editPackModal'),
  })

  // 设置初始值
  document.getElementById('editId').value = Pack.id
  $('#editGameId').val(Pack.game_id)
  $('#editGameId').trigger('change')
  document.getElementById('editName').value = Pack.name
  document.getElementById('editDesc').value = Pack.desc
  document.getElementById('editPrice').value = Pack.price
  document.getElementById('editOrgPrice').value = Pack.org_price
  document.getElementById('editDiscount').value = Pack.discount
  document.getElementById('editOrder').value = Pack.order
})

// 新增游戏商品
document.querySelector('#add-btn').addEventListener('click', function () {
  var id = document.getElementById('PackId').value
  var game_id = document.getElementById('GameId').value
  var name = document.getElementById('Name').value
  var desc = document.getElementById('Desc').value
  var price = document.getElementById('Price').value
  var org_price = document.getElementById('OrgPrice').value
  var discount = document.getElementById('Discount').value
  var order = document.getElementById('Order').value
  console.log(id)
  doPackAdd({
    id: id,
    game_id: game_id,
    name: name,
    desc: desc,
    price: price,
    org_price: org_price,
    discount: discount,
    order: order,
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
  var game_id = document.getElementById('editGameId').value
  var name = document.getElementById('editName').value
  var desc = document.getElementById('editDesc').value
  var price = document.getElementById('editPrice').value
  var org_price = document.getElementById('editOrgPrice').value
  var discount = document.getElementById('editDiscount').value
  var order = document.getElementById('editOrder').value

  doPackEdit({
    id: id,
    game_id: game_id,
    name: name,
    desc: desc,
    price: price,
    org_price: org_price,
    discount: discount,
    order: order,
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

// 删除游戏商品
document.querySelector('#delete-btn').addEventListener('click', function () {
  var id = document.getElementById('deleteId').value
  console.log(id)
  doPackDelete({
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
