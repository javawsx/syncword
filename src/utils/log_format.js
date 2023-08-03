const log4js = require('log4js')
const { LOG_CONFIG } = require('../config/config.log')
log4js.configure(LOG_CONFIG)

const errorLogger = log4js.getLogger('error')
const resLogger = log4js.getLogger('response')

const logFormat = {}

//封装错误日志
logFormat.error = (ctx, error, resTime) => {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime))
  }
}
// 封装响应日志
logFormat.response = (ctx, resTime) => {
  // 只发送后端逻辑请求的响应
  if (ctx && ctx.request.originalUrl.indexOf('/api/') !== -1) {
    resLogger.info(formatRes(ctx, resTime))
  }
}

//格式化响应日志
const formatRes = (ctx, resTime) => {
  const responserLog = formatReqLog(ctx.request, resTime) // 添加请求日志
  responserLog.push(`response status: ${ctx.status}`) // 响应状态
  responserLog.push(`response message: ${ctx.message}`) // 响应内容
  if (ctx.body) {
    responserLog.push(`response body code: ${ctx.body.code}`) // 响应码
    responserLog.push(
      `response body message: ${JSON.stringify(ctx.body.message)}`
    ) // 响应内容
  }
  responserLog.push(`------------------------ end\n`) // 响应日志结束
  return responserLog.join('\n')
}

//格式化错误日志
const formatError = (ctx, err, resTime) => {
  const errorLog = formatReqLog(ctx.request, resTime) // 添加请求日志
  errorLog.push(`err name: ${err.name}`) // 错误名称
  errorLog.push(`err status: ${err.status}`) // 错误状态码
  errorLog.push(`err stack: ${err.stack}`) // 错误详情
  errorLog.push(`------------------------ end\n`) // 错误信息结束
  return errorLog.join('\n')
}

// 格式化请求日志
const formatReqLog = (req, resTime) => {
  const method = req.method
  // 访问方法 请求原始地址 客户端ip
  const formatLog = [
    `\n------------------------ ${method} ${req.originalUrl}`,
    `request client ip: ${req.ip}`,
  ]

  if (method === 'GET') {
    // 请求参数
    formatLog.push(`request query: ${JSON.stringify(req.query)}\n`)
  } else {
    formatLog.push(`request body: ${JSON.stringify(req.body)}\n`)
  }

  formatLog.push(`response time: ${resTime}`) // 服务器响应时间
  return formatLog
}

module.exports = logFormat
