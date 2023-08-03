const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')

const {
  tokenExpiredError,
  invalidToken,
  hasNotAdminPermission,
} = require('../constant/err.type')

const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        return ctx.app.emit('error', ctx, tokenExpiredError, err)
      case 'JsonWebTokenError':
        return ctx.app.emit('error', ctx, invalidToken, err)
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
  hadAdminPermission,
}
