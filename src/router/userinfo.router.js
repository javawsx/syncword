const koaRouter = require('koa-router')
const router = new koaRouter({ prefix: '/api/users' })

const {
  cryptPassword,
  verifyPassword,
} = require('../middleware/user.middleware')
const { changePassword, userInfo } = require('../controller/user.controller')
const { auth } = require('../middleware/auth.middleware')

// 获取用户信息
router.get('/userInfo', auth, userInfo)

// change password
router.patch('/', auth, verifyPassword, cryptPassword, changePassword)

module.exports = router
