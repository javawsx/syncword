import {
  doGetShopList,
  doShopAdd,
  doShopEdit,
  doShopDelete,
} from './axios/shop.api.js'
import { alertSuccess, alertLinkAfterSuccess } from './axios/alerts.js'

var shopTable
var selectData
$(document).ready(function () {
  doGetShopList()
    .then(function (response) {
      shopTable = new DataTable('#shopDataTables', {
        data: response.data.result,
        columns: [
          { data: 'id' },
          { data: 'gold' },
          { data: 'price' },
          { data: 'name' },
          { data: 'desc' },
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
})

// 点击事件渲删除商品界面下拉框
$('#shopDataTables tbody').on('click', '.deleteShop', function () {
  var Shop = shopTable.row($(this).parents('tr')).data()
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
  var Shop = shopTable.row($(this).parents('tr')).data()
  $('.js-example-basic-single').select2({
    data: selectData,
    dropdownParent: $('#editShopModal'),
  })

  // 设置初始值
  document.getElementById('editId').value = Shop.id
  document.getElementById('editGold').value = Shop.gold
  document.getElementById('editPrice').value = Shop.price
  document.getElementById('editName').value = Shop.name
  document.getElementById('editDesc').value = Shop.desc
})

// 新增游戏商品
document.querySelector('#add-btn').addEventListener('click', function () {
  var gold = document.getElementById('Gold').value
  var name = document.getElementById('Name').value
  var desc = document.getElementById('Desc').value
  var price = document.getElementById('Price').value

  doShopAdd({
    gold: gold,
    price: price,
    name: name,
    desc: desc,
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
  var gold = document.getElementById('editGold').value
  var name = document.getElementById('editName').value
  var desc = document.getElementById('editDesc').value
  var price = document.getElementById('editPrice').value

  doShopEdit({
    id: id,
    gold: gold,
    price: price,
    name: name,
    desc: desc,
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
