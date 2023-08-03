const koaRouter = require('koa-router')
const {
  orderList,
  orderData,
  chartData,
  donutData,
  searchOrderList,
} = require('../controller/order.controller')
const router = new koaRouter({ prefix: '/api/order' })
const { auth } = require('../middleware/auth.middleware')

router.get('/list', auth, orderList)

router.get('/data', auth, orderData)
router.post('/chart', auth, chartData)
router.post('/donut', auth, donutData)
router.post('/search-order', auth, searchOrderList)

module.exports = router
