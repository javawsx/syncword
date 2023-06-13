const jwt = require('jsonwebtoken')
const numRandom = require('number-random')
const {
  createUser,
  getUserInfo,
  updateById,
} = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')
const uEmail = require('../utils/email')

class UserController {
  async register(ctx, next) {
    // 1.获取参数
    const { user_name, password, email } = ctx.request.body

    try {
      // 2.数据库处理
      const res = await createUser(user_name, password, email)

      // 3.返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功！',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body

    console.log('登录：' + user_name)

    // 1.获取用户信息(在token的playLoad中，记录id,user_name,is_admin)
    try {
      // 获取查询数据
      const userInfo = await getUserInfo({ user_name })
      // session赋值
      ctx.session.isLogin = true
      ctx.session.username = userInfo.user_name
      ctx.session.is_admin = userInfo.is_admin
      ctx.session.email = userInfo.email

      // 从返回结果中剔除password和email
      const { password, email, ...res } = userInfo

      // 返回结果
      ctx.body = {
        code: 0,
        message: '用户登录成功！',
        result: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
      }
    } catch (err) {
      console.error('用户登录失败！', err)
    }
  }

  async userInfo(ctx, next) {
    const { id } = ctx.request.body
    // 1.获取用户信息(在token的playLoad中，记录id,user_name,is_admin)
    try {
      // 从返回结果中剔除password和email
      const { password, ...res } = await getUserInfo({ id })

      ctx.body = {
        code: 0,
        message: '用户信息获取成功！',
        result: res,
      }
    } catch (err) {
      console.error('用户信息获取失败！', err)
    }
  }

  async userEdit(ctx, next) {
    const { user_name, email } = ctx.request.body
    const id = ctx.state.user.id
    try {
      if (await updateById({ id, user_name, email })) {
        // 成功，更新用户信息session值
        ctx.session.username = user_name
        ctx.session.email = email

        // 3.返回结果
        ctx.body = {
          code: 0,
          message: '用户信息更新成功！',
          result: '',
        }
      }
    } catch (err) {
      console.error('用户信息更新失败！', err)
    }
  }

  async sendCaptcha(ctx, next) {
    const { email } = ctx.request.body
    if (email) {
      uEmail.send(email, numRandom(100000, 999999))
      ctx.body = {
        code: 0,
        message: '邮件已发送',
        result: '',
      }
    } else {
      ctx.body = {
        code: 1,
        message: 'email 不存在',
        result: '',
      }
    }
  }

  async changePassword(ctx, next) {
    // 1.根据请求数据头获取用户ID
    const password = ctx.request.body.password
    const id = ctx.state.user.id

    // 2.根据ID更新数据库里密码信息
    try {
      if (await updateById({ id, password })) {
        // 3.返回结果
        ctx.body = {
          code: 0,
          message: '密码更新成功！',
          result: '',
        }
      }
    } catch (err) {
      console.error('密码更新失败！', err)
    }
  }
}

module.exports = new UserController()
