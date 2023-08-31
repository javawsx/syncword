const koaRouter = require('koa-router')
const {
  getList,
  create,
  createBatch,
  updateById,
  deleteById,
} = require('../controller/pack.item.controller')
const router = new koaRouter({ prefix: '/api/pack-item' })
const { auth } = require('../middleware/auth.middleware')

router.get('/list', auth, getList)

router.post('/add', auth, create)
router.post('/addBatch', auth, createBatch)
router.post('/edit', auth, updateById)
router.post('/delete', auth, deleteById)

module.exports = router
