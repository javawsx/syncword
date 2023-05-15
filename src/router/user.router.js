const { userValidator, verifyUser, cryptPassword, verifyEmail, verifyPassword, verifyLogin} = require('../middleware/user.middleware')
const { register, login, changePassword } = require('../controller/user.controller')
const { auth } = require('../middleware/auth.middleware')
const koaRouter = require('koa-router')
const router = new koaRouter({prefix: '/users'})

// login
router.get('/login', async ctx =>{
    ctx.body = `login api`
})

// register
router.post('/register', userValidator, verifyPassword, verifyEmail, verifyUser, cryptPassword, register)

// login
router.post('/login',userValidator, verifyLogin, login)

// change password
router.patch('/', auth, verifyPassword, cryptPassword, changePassword)


module.exports = router