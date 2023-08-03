const koaRouter = require('koa-router')
const {
  getList,
  create,
  createBatch,
  updateById,
  deleteById,
} = require('../controller/pack.code.controller')
const router = new koaRouter({ prefix: '/api/pack-code' })
const { auth } = require('../middleware/auth.middleware')

router.get('/list', auth, getList)

router.post('/add', auth, create)
router.post('/addBatch', createBatch)
router.post('/edit', auth, updateById)
router.post('/delete', auth, deleteById)

module.exports = router
