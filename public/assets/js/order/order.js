import { doGetList, doSearchOrderList } from '../axios/order.api.js'
import { doGetGameSelect } from '../axios/game.api.js'
var orderDataTable
var selectData
$(document).ready(function () {
  doGetList()
    .then(function (response) {
      createDataTables(response.data.result)
    })
    .catch(function (error) {
      console.log(error)
    })

  // 加载下拉框数据
  doGetGameSelect()
    .then(function (response) {
      selectData = response.data.result
      selectData.unshift({ id: 'all', text: 'All' })
      $('.js-example-basic-single').select2({
        data: selectData,
      })
    })
    .catch(function (error) {
      console.log(error)
    })

  // type 下拉框自定义
  $('.js-order-type').select2({
    data: [
      { id: 'all', text: 'All' },
      { id: 1, text: 'Coin' },
      { id: 2, text: 'Game' },
      { id: 3, text: 'Pack' },
    ],
  })

  // status 下拉框自定义
  $('.js-order-status').select2({
    data: [
      { id: 'all', text: 'All' },
      { id: 0, text: 'Failed' },
      { id: 1, text: 'Success' },
    ],
  })
})

// 创建渲染table
function createDataTables(data) {
  orderDataTable = new DataTable('#orderDataTables', {
    data: data,
    dom: 'Bfrtip',
    buttons: ['copy', 'csv', 'excel', 'print'],
    columns: [
      { data: 'id' },
      { data: 'order_no' },
      { data: 'type' },
      {
        data: 'timestamp',
        render: function (data, type, row) {
          return moment(data).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      { data: 'status' },
      { data: 'user_id' },
      { data: 'game_id' },
      { data: 'server_id' },
      { data: 'product_id' },
      { data: 'product_name' },
      { data: 'product_desc' },
      { data: 'currency' },
      { data: 'amount' },
      { data: 'balance' },
      { data: 'end_balance' },
      { data: 'token' },
      { data: 'external_id' },
    ],
    select: {
      style: 'os',
      blurable: true,
    },
    destroy: true, //允许销毁表结构
    info: true,
    autoWidth: true,
  })
}

// 查询更新table数据
document.querySelector('#search-btn').addEventListener('click', function () {
  var order_no = document.getElementById('selectOrderId').value
  var user_id = document.getElementById('selectUserId').value
  var type = document.getElementById('selectOrderType').value
  var status = document.getElementById('selectOrderStatus').value
  var game_id = document.getElementById('selectGameId').value
  var startDate = document.getElementById('selectStartDate').value
  var endDate = document.getElementById('selectEndDate').value
  searchRender(order_no, user_id, type, status, game_id, startDate, endDate)
})

// 重新请求数据
function searchRender(
  order_no,
  user_id,
  type,
  status,
  game_id,
  startDate,
  endDate
) {
  doSearchOrderList({
    order_no: order_no,
    user_id: user_id,
    type: type,
    status: status,
    game_id: game_id,
    startDate: startDate,
    endDate: endDate,
  })
    .then(function (response) {
      console.log(response.data.result)
      orderDataTable.destroy()
      createDataTables(response.data.result)
    })
    .catch(function (error) {
      console.log(error)
    })
}
