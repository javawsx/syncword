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
  userInfo,
  sendCaptcha,
} = require('../controller/user.controller')
const { auth } = require('../middleware/auth.middleware')
const koaRouter = require('koa-router')
const router = new koaRouter({ prefix: '/users' })

// login
// router.get('/login', async ctx =>{
//     ctx.body = `login api`
//     console.log('login success');
// })

// register
router.post(
  '/my/register',
  userValidator,
  verifyPassword,
  verifyEmail,
  verifyUser,
  cryptPassword,
  register
)

// login
router.post('/my/login', userValidator, verifyLogin, login)

// emailValidator
router.post('/my/email', verifyEmail, verifyEmailExist, sendCaptcha)

router.get('/userInfo', auth, userInfo)

// change password
router.patch('/', auth, verifyPassword, cryptPassword, changePassword)

module.exports = router
