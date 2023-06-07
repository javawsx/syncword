const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { upload } = require('../controller/good.controller')
const koaRouter = require('koa-router')
const router = new koaRouter({prefix: '/goods'})

// 加载图片
router.post('/upload', auth, hadAdminPermission, upload)

module.exports = router
