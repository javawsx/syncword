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
  userDoesNotExits,
  userLoginError,
} = require('../constant/err.type')

// 验证参数合法性
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  console.log(ctx.request.body)
  console.log(user_name)
  console.log(password)
  if (Validator.isEmpty(user_name) || Validator.isEmpty(password)) {
    console.error('用户名或者密码不能为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

// 验证密码合法性
const verifyPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  // if (!Validator.isLength(password, { min: 8, max: undefined }) || Validator.isAlphanumeric(password)) {
  //   console.error('密码格式不正确', ctx.request.body)
  //   ctx.app.emit('error', userPasswordError, ctx)
  //   return
  // }
  await next()
}

// 验证邮箱合法性
const verifyEmail = async (ctx, next) => {
  const { email } = ctx.request.body
  if (Validator.isEmpty(email) || !Validator.isEmail(email)) {
    console.error('邮箱不能为空或者邮箱格式不正确', ctx.request.body)
    ctx.app.emit('error', userEmailError, ctx)
    return
  }
  await next()
}

// 验证注册时用户名是否已经存在
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body

  try {
    const res = await getUserInfo({ user_name })

    if (res) {
      console.error('用户已存在', { user_name })
      ctx.app.emit('error', userAlreadyExisted, ctx)
      return
    }
  } catch (error) {
    console.error('获取用户信息错误', error)
    return ctx.app.emit('error', userRegisterError, ctx)
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
      console.error('用户不存在', { user_name })
      ctx.app.emit('error', userDoesNotExits, ctx)
      return
    }

    // 2. 验证密码是否正确

    if (!bcrypt.compareSync(password, res.password)) {
      console.error('密码不匹配')
      ctx.app.emit('error', invalidPasswordError, ctx)
      return
    }
  } catch (error) {
    console.error('用户登录失败', error)
    return ctx.app.emit('error', userLoginError, ctx)
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
      ctx.app.emit('error', emailNotRegister, ctx)
      return
    }
  } catch (error) {
    return ctx.app.emit('error', emailCheckError, ctx)
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
