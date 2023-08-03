import {
  doGetShopList,
  doGetGameSelect,
  doShopAdd,
  doShopEdit,
  doShopDelete,
} from '../axios/game.api.js'
import { alertSuccess, alertLinkAfterSuccess } from '../axios/alerts.js'

var gameShopTable
var selectData
$(document).ready(function () {
  doGetShopList()
    .then(function (response) {
      gameShopTable = new DataTable('#shopDataTables', {
        data: response.data.result,
        columns: [
          { data: 'id' },
          { data: 'game_id' },
          { data: 'name' },
          { data: 'amount' },
          { data: 'price' },
          { data: 'currency' },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-success editShop' data-bs-toggle='modal' id='editShop' data-bs-target='#editShopModal'>" +
              "<i class='ri-pencil-fill fs-16'></i> Edit" +
              '</button>' +
              '</div>',
          },
          {
            targets: -1,
            data: null,
            defaultContent:
              "<div class='d-flex gap-1 flex-wrap'>" +
              "<button type='button' class='btn btn-danger deleteShop' data-bs-toggle='modal' id='deleteShop' data-bs-target='#deleteShopModel'>" +
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
$('#shopDataTables tbody').on('click', '.deleteShop', function () {
  var Shop = gameShopTable.row($(this).parents('tr')).data()
  // 设置初始值
  document.getElementById('deleteId').value = Shop.id
})

// 点击事件渲染增加商品界面下拉框
document.querySelector('#addShop').addEventListener('click', function () {
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#addShopModal'),
  })
})

// 点击事件渲染修改商品界面下拉框
$('#shopDataTables tbody').on('click', '.editShop', function () {
  var Shop = gameShopTable.row($(this).parents('tr')).data()
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#editShopModal'),
  })

  // 设置初始值
  document.getElementById('editId').value = Shop.id
  $('#editGameId').val(Shop.game_id)
  $('#editGameId').trigger('change')
  document.getElementById('editShopName').value = Shop.name
  document.getElementById('editAmount').value = Shop.amount
  document.getElementById('editPrice').value = Shop.price
  document.getElementById('editCurrency').value = Shop.currency
})

// 新增游戏商品
document.querySelector('#add-btn').addEventListener('click', function () {
  var game_id = document.getElementById('GameId').value
  var name = document.getElementById('ShopName').value
  var amount = document.getElementById('Amount').value
  var price = document.getElementById('Price').value
  var currency = document.getElementById('Currency').value
  doShopAdd({
    game_id: game_id,
    name: name,
    amount: amount,
    price: price,
    currency: currency,
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
  var name = document.getElementById('editShopName').value
  var amount = document.getElementById('editAmount').value
  var price = document.getElementById('editPrice').value
  var currency = document.getElementById('editCurrency').value
  doShopEdit({
    id: id,
    game_id: game_id,
    name: name,
    amount: amount,
    price: price,
    currency: currency,
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
  doShopDelete({
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
