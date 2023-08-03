const koaRouter = require('koa-router')
const {
  getList,
  create,
  updateById,
  deleteById,
  getSelectList,
} = require('../controller/faq.topic.controller')
const router = new koaRouter({ prefix: '/api/faq-topic' })
const { auth } = require('../middleware/auth.middleware')

router.get('/list', auth, getList)
router.get('/select', auth, getSelectList)
router.post('/add', auth, create)
router.post('/edit', auth, updateById)
router.post('/delete', auth, deleteById)

module.exports = router
