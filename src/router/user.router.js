const {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyEmail,
  verifyPassword,
  verifyLogin,
  verifyEmailExist,
} = require('../middleware/user.middleware')
const {
  register,
  login,
  changePassword,
  sendCaptcha,
} = require('../controller/user.controller')
const koaRouter = require('koa-router')
const router = new koaRouter({ prefix: '/api' })

// login
// router.get('/login', async ctx =>{
//     ctx.body = `login api`
//     console.log('login success');
// })

// register
router.post(
  '/register',
  userValidator,
  verifyPassword,
  verifyEmail,
  verifyUser,
  cryptPassword,
  register
)

// login
router.post('/login', userValidator, verifyLogin, login)

// emailValidator
router.post('/email', verifyEmail, verifyEmailExist, sendCaptcha)

module.exports = router
