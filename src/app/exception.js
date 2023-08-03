class Exception extends Error {
  constructor(message = '服务器异常', code, status) {
    super()
    this.code = code
    this.status = status
    this.message = message
  }
}

module.exports = Exception
