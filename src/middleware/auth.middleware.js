const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')

const { tokenExpiredError,
        invalidToken,
        hasNotAdminPermission} = require('../constant/err.type')

const auth = async (ctx, next) =>{
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')

  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    console.log(err.name);
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err);
        return ctx.app.emit('error', tokenExpiredError, err)
      case 'JsonWebTokenError':
        console.error('无效的Token', err)
        return ctx.app.emit('error', invalidToken, err)
    }
  }

  await next()
}

const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user

  if (!is_admin) {
    console.error('该用户没有管理员的权限', ctx.state.user)
    return ctx.app.emit('error', hasNotAdminPermission, ctx)
  }

  await next()
}


module.exports = {
  auth,
  hadAdminPermission
}