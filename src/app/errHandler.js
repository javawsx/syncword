module.exports = (ctx, errBody, error) => {
  let status = 400
  // 常规定义错误
  switch (errBody.code) {
    case '10109':
      status = 401
      break
    case '10110':
      status = 401
      break
    case '10111':
      status = 403
      break
    default:
      status = 400
  }
  ctx.status = status
  ctx.body = errBody
  // 非常规定义错误
  if (error) {
    //直接抛出
    ctx.throw(error)
  }
}
