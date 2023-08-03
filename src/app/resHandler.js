class Resolve {
  success(message = 'success', code = 1, status = 200) {
    return {
      code,
      status,
      message,
    }
  }
  json(message = 'success', result, code = 1, status = 200) {
    return {
      code,
      status,
      message,
      result,
    }
  }
}

module.exports = new Resolve()
