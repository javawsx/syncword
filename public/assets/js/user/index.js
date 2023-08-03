import { doGetData, doChartData, doDonutData } from '../axios/order.api.js'
import { doGetList } from '../axios/player.api.js'
moment.locale('zh-cn')

self.setInterval(setTime, 1000)
function setTime() {
  var formatDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  document.getElementById('Time').innerHTML = formatDate
}

// 初始化加载表
chartRender(7)
donutRender(1)
// 点击按钮加载数据
document.querySelector('#chart-7').addEventListener('click', function () {
  chartRender(7)
  donutRender(7)
})
document.querySelector('#chart-15').addEventListener('click', function () {
  chartRender(15)
  donutRender(15)
})
document.querySelector('#chart-30').addEventListener('click', function () {
  chartRender(30)
  donutRender(30)
})

// 处理每日数据，充值总金额以及订单数量
doGetData()
  .then(function (response) {
    var chargeData = response.data.result.charge
    document.getElementById('chargeOrders').innerHTML = chargeData.orders
    document.getElementById('chargeMoney').innerHTML =
      chargeData.money != null ? chargeData.money : 0

    var gameData = response.data.result.game
    document.getElementById('gameOrders').innerHTML = gameData.orders
    document.getElementById('gameMoney').innerHTML =
      gameData.money != null ? gameData.money : 0
  })
  .catch(function (error) {
    console.log(error)
  })

// 处理每日数据, 玩家总数
doGetList()
  .then(function (response) {
    var data = response.data.result
    document.getElementById('Players').innerHTML = data.length
  })
  .catch(function (error) {
    console.log(error)
  })

// chart
var options = {
  chart: {
    height: 500,
  },
  dataLabels: {
    enabled: false,
  },
  series: [],
  title: {
    text: '',
  },
  noData: {
    text: 'Loading...',
  },
}
var chart = new ApexCharts(document.querySelector('#charts'), options)
chart.render()

//加载数据
function chartRender(type) {
  doChartData({
    type: type,
  })
    .then(function (response) {
      var data = response.data.result
      chart.updateSeries([
        {
          name: 'ChargeMoney',
          type: 'bar',
          data: data.chargeMoney,
        },
        {
          name: 'ChargeOrders',
          type: 'line',
          data: data.chargeOrder,
        },
        {
          name: 'GameMoney',
          type: 'bar',
          data: data.gameMoney,
        },
        {
          name: 'GameOrders',
          type: 'line',
          data: data.gameOrder,
        },
      ])
    })
    .catch(function (error) {
      console.log(error)
    })
}

// 环形图

//加载数据
function donutRender(type) {
  doDonutData({
    type: type,
  })
    .then(function (response) {
      var data = response.data.result
      console.log(data.donut)
      // 加载数据后渲染表
      var donutOptions = {
        series: data.donut,
        labels: data.label,
        chart: { height: 500, type: 'donut' },
        legend: { position: 'bottom' },
        stroke: { show: !1 },
        dataLabels: { dropShadow: { enabled: !1 } },
        colors: chartDonutBasicColors,
      }
      var chartDonut = new ApexCharts(
        document.querySelector('#chartDonut'),
        donutOptions
      )
      chartDonut.render()

      // 主动更新表数据
      chartDonut.updateSeries(data.donut)
    })
    .catch(function (error) {
      console.log(error)
    })
}

function getChartColorsArray(e) {
  if (null !== document.getElementById(e))
    return (
      (e = document.getElementById(e).getAttribute('data-colors')),
      (e = JSON.parse(e)).map(function (e) {
        var t = e.replace(' ', '')
        return -1 === t.indexOf(',')
          ? getComputedStyle(document.documentElement).getPropertyValue(t) || t
          : 2 == (e = e.split(',')).length
          ? 'rgba(' +
            getComputedStyle(document.documentElement).getPropertyValue(e[0]) +
            ',' +
            e[1] +
            ')'
          : t
      })
    )
}
