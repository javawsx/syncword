const koaRouter = require('koa-router')
const {
  gameList,
  gameSelectList,
  create,
  updateById,
  deleteById,
} = require('../controller/game.controller')
const router = new koaRouter({ prefix: '/api/game' })
const { auth } = require('../middleware/auth.middleware')

router.get('/list', auth, gameList)
router.get('/select', auth, gameSelectList)

router.post('/add', auth, create)
router.post('/edit', auth, updateById)
router.post('/delete', auth, deleteById)

module.exports = router
