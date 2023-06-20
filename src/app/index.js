const path = require('path')
const fs = require('fs')

const app = require('./koa')

const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const koaStatic = require('koa-static')
const views = require('koa-views')
const koaEjs = require('koa-ejs')
const session = require('koa-session')

const errHandler = require('./errHandler')
const router = require('../router/index')
const logger = require('../middleware/logger.middleware')

// 全局使用跨域中间件
app.use(cors())

// 全局使用日志中间件
app.use(logger())

// 配置静态资源
app.use(koaStatic(process.cwd() + '/public'))

// 配置模版引擎中间件
// app.use(
//   views(process.cwd() + '/Views', {
//     extension: 'ejs',
//   })
// )

// 配置模版引擎中间件
koaEjs(app, {
  root: process.cwd() + '/Views',
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false,
})

app.use(
  koaBody({
    multipart: true, // 支持多文件上传
    formidable: {
      uploadDir: process.cwd() + '/public/assets/images/upload', // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 10 * 1024 * 1024, // 文件上传大小限制
      onFileBegin: (name, file) => {
        // 最终要保存到的文件夹目录
        const dir = process.cwd() + '/public/assets/images/upload'
        // 检查文件夹是否存在如果不存在则新建文件夹
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
        // 文件名称去掉特殊字符但保留原始文件名称
        const reg = /\.[A-Za-z]+$/g
        const ext = file.newFilename.match(reg)[0]

        //修改上传文件名
        file.filepath =
          process.cwd() +
          '/public/assets/images/upload/' +
          'upload_' +
          Date.now() +
          ext
      },
      onError: (error) => {
        app.status = 400
        // 这里可以定义自己的返回内容
        app.emit(error)
        return
      },
    },
  })
)

app.keys = ['some secret message']
const CONFIG = {
  key: 'MyCookie', //cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //(boolean) renew session when session is nearly expired,
  //store: new sessionStore(redis)
}

app.use(session(CONFIG, app))

// 统一加载路由
app.use(router.routes()).use(router.allowedMethods)

app.on('error', errHandler)

module.exports = app
