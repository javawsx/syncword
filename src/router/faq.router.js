const koaRouter = require('koa-router')
const {
  getList,
  create,
  updateById,
  deleteById,
} = require('../controller/faq.controller')
const router = new koaRouter({ prefix: '/api/faq' })
const { auth } = require('../middleware/auth.middleware')

router.get('/list', auth, getList)
router.post('/add', auth, create)
router.post('/edit', auth, updateById)
router.post('/delete', auth, deleteById)

module.exports = router
