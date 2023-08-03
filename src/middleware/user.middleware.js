const Validator = require('validator')
const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExisted,
  userRegisterError,
  userEmailError,
  userPasswordError,
  invalidPasswordError,
  emailNotRegister,
  emailCheckError,
  userLoginError,
} = require('../constant/err.type')

// 验证参数合法性
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  if (Validator.isEmpty(user_name) || Validator.isEmpty(password)) {
    // 终端输出错误
    console.error(userFormateError.message, ctx.request.body)

    // 返回前端错误
    return ctx.app.emit('error', ctx, userFormateError)
  }

  await next()
}

// 验证密码合法性
const verifyPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  if (
    !Validator.isLength(password, { min: 8, max: undefined }) ||
    !Validator.isAlphanumeric(password)
  ) {
    // 终端输出错误
    console.error(userPasswordError.message, ctx.request.body)
    // 返回前端错误
    return ctx.app.emit('error', ctx, userPasswordError)
  }
  await next()
}

// 验证邮箱合法性
const verifyEmail = async (ctx, next) => {
  const { email } = ctx.request.body
  if (Validator.isEmpty(email) || !Validator.isEmail(email)) {
    // 终端输出错误
    console.error(userEmailError.message, ctx.request.body)
    // 返回前端错误
    return ctx.app.emit('error', ctx, userEmailError)
  }
  await next()
}

// 验证注册时用户名是否已经存在
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body

  try {
    const res = await getUserInfo({ user_name })

    if (res) {
      // 终端输出错误
      console.error(userAlreadyExisted.message, { user_name })
      // 返回前端错误
      return ctx.app.emit('error', ctx, userAlreadyExisted)
    }
  } catch (error) {
    // 终端输出错误
    console.error(userRegisterError.message, error)
    // 返回前端错误
    return ctx.app.emit('error', ctx, userRegisterError)
  }

  await next()
}

// 密码加密中间件
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  ctx.request.body.password = bcrypt.hashSync(password, salt)

  await next()
}

// 用户登录验证
const verifyLogin = async (ctx, next) => {
  // 1.判断用户是否存在
  const { user_name, password } = ctx.request.body

  try {
    const res = await getUserInfo({ user_name })

    if (!res) {
      // 终端输出错误
      console.error('用户不存在', { user_name })
      // 返回前端错误
      return ctx.app.emit('error', ctx, invalidPasswordError)
    }

    // 2. 验证密码是否正确

    if (!bcrypt.compareSync(password, res.password)) {
      // 终端输出错误
      console.error('密码不匹配')
      // 返回前端错误
      return ctx.app.emit('error', ctx, invalidPasswordError)
    }
  } catch (err) {
    // 终端输出错误
    console.error('用户登录失败')
    // 返回前端错误
    return ctx.app.emit('error', ctx, userLoginError, err)
  }

  await next()
}

// 邮件是否注册账号检测
const verifyEmailExist = async (ctx, next) => {
  // 1.判断用户是否存在
  const { email } = ctx.request.body

  try {
    const res = await getUserInfo({ email })

    if (!res) {
      console.error('该邮件并未注册账户，请检查', { email })
      // 返回前端错误
      return ctx.app.emit('error', ctx, emailNotRegister)
    }
  } catch (err) {
    return ctx.app.emit('error', ctx, emailCheckError, err)
  }

  await next()
}

module.exports = {
  userValidator,
  verifyPassword,
  verifyUser,
  cryptPassword,
  verifyEmail,
  verifyLogin,
  verifyEmailExist,
}
