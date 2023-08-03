const koaRouter = require('koa-router')
const {
  getList,
  create,
  updateById,
  deleteById,
} = require('../controller/news.controller')
const router = new koaRouter({ prefix: '/api/news' })
const { auth } = require('../middleware/auth.middleware')

router.get('/list', auth, getList)
router.post('/add', auth, create)
router.post('/edit', auth, updateById)
router.post('/delete', auth, deleteById)

module.exports = router
