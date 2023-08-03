const CONFIG = {
  API_PREFIX: '/api', // 配置了路由前缀
  LOG_CONFIG: {
    appenders: {
      error: {
        category: 'errorLogger', // logger 名称
        type: 'dateFile', // 日志类型为 dateFile
        filename: 'logs/error/error', // 日志输出位置
        encoding: 'utf-8',
        alwaysIncludePattern: true, // 是否总是有后缀名
        pattern: 'yyyy-MM-dd-hh.log', // 后缀，每小时创建一个新的日志文件
      },
      response: {
        category: 'resLogger',
        type: 'dateFile',
        filename: 'logs/response/response',
        encoding: 'utf-8',
        alwaysIncludePattern: true,
        pattern: 'yyyy-MM-dd-hh.log',
      },
    },
    categories: {
      error: {
        appenders: ['error'], // 指定日志被追加到 error 的 appenders 里面
        level: 'error', // 等级大于 error 的日志才会写入
      },
      response: {
        appenders: ['response'],
        level: 'info',
      },
      default: {
        appenders: ['response'],
        level: 'info',
      },
    },
  },
}

module.exports = CONFIG
