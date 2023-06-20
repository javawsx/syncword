const koaRouter = require('koa-router')
const router = new koaRouter({ prefix: '/api/users' })

const {
  cryptPassword,
  verifyPassword,
} = require('../middleware/user.middleware')
const {
  changePassword,
  userInfo,
  userEdit,
  userImageEdit,
} = require('../controller/user.controller')
const { auth } = require('../middleware/auth.middleware')

// 获取用户信息
router.get('/userInfo', auth, userInfo)

// 更改用户信息
router.post('/edit', auth, userEdit)

// 更改用户信息
router.post('/editImage', auth, userImageEdit)

// change password
router.patch(
  '/changePassword',
  auth,
  verifyPassword,
  cryptPassword,
  changePassword
)

module.exports = router
