const koaRouter = require('koa-router')
const {
  playerList,
  updateById,
  deleteById,
} = require('../controller/player.controller')
const router = new koaRouter({ prefix: '/api/player' })
const { auth } = require('../middleware/auth.middleware')

router.get('/list', auth, playerList)

router.post('/edit', auth, updateById)
router.post('/delete', auth, deleteById)

module.exports = router
