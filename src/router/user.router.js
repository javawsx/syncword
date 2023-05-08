const { userValidator, verifyUser} = require('../middleware/user.middleware')
const { register, login } = require('../controller/user.controller')
const koaRouter = require('koa-router')
const router = new koaRouter({prefix: '/users'})

// login
router.get('/login', async ctx =>{
    ctx.body = `login api`
})

// register
router.post('/register', userValidator, verifyUser, register)

// login
router.post('/login', login)


module.exports = router