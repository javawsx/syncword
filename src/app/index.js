const app = require('./koa')
const bodyParser = require('koa-bodyparser')
const errHandler = require('./errHandler')
const router = require('../router/index')


app.use(bodyParser())

app.use(router.routes())

app.on('error',errHandler)

module.exports=app