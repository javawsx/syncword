const jwt = require('jsonwebtoken')
const numRandom = require('number-random')
const path = require('path')
const {
  createUser,
  getUserInfo,
  updateById,
} = require('../service/user.service')
const {
  userRegisterError,
  fileUploadError,
  noSupportFileType,
  userLoginError,
  userUpdateError,
  userGetError,
  passwordUpdateError,
  imageUpdateError,
} = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')
const uEmail = require('../utils/email')
const ResP = require('../app/resHandler')

class UserController {
  async register(ctx, next) {
    // 1.获取参数
    const { user_name, password, email, user_image } = ctx.request.body

    try {
      // 2.数据库处理
      const res = await createUser(user_name, password, email, user_image)

      // 3.返回结果
      if (res != null) {
        ctx.body = ResP.json('用户注册成功！', {
          id: res.id,
          user_name: res.user_name,
        })
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, userRegisterError, ctx, err)
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body

    // 1.获取用户信息(在token的playLoad中，记录id,user_name,is_admin)
    try {
      // 获取查询数据
      const userInfo = await getUserInfo({ user_name })
      if (userInfo != null) {
        // session赋值
        ctx.session.isLogin = true
        ctx.session.username = userInfo.user_name
        ctx.session.is_admin = userInfo.is_admin
        ctx.session.email = userInfo.email
        ctx.session.user_image = userInfo.user_image

        // 从返回结果中剔除password和email
        const { password, email, ...res } = userInfo

        // 返回结果
        ctx.body = ResP.json(
          '用户登录成功！',
          jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
        )
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, userLoginError, ctx, err)
    }
  }

  async userInfo(ctx, next) {
    const { id } = ctx.request.body
    // 1.获取用户信息(在token的playLoad中，记录id,user_name,is_admin)
    try {
      // 从返回结果中剔除password和email
      const { password, ...res } = await getUserInfo({ id })
      if (res != null) {
        // 返回结果
        ctx.body = ResP.json('用户信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, userGetError, ctx, err)
    }
  }

  // 修改用户信息
  async userEdit(ctx, next) {
    const { user_name, email } = ctx.request.body
    const id = ctx.state.user.id
    try {
      if (await updateById({ id, user_name, email })) {
        // 成功，更新用户信息session值
        ctx.session.username = user_name
        ctx.session.email = email

        // 3.返回结果
        ctx.body = ResP.success('用户信息更新成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, userUpdateError, ctx, err)
    }
  }

  // 修改用户信息
  async userImageEdit(ctx, next) {
    const { file } = ctx.request.files
    const id = ctx.state.user.id
    const fileTypes = ['image/png', 'image/jpeg']
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit('error', noSupportFileType, ctx)
      }
      const user_image = path.basename(file.filepath)
      try {
        if (await updateById({ id, user_image })) {
          // 成功，更新用户信息session值
          ctx.session.user_image = user_image
          // 3.返回结果
          ctx.body = ResP.success('头像更新成功！')
        }
      } catch (err) {
        return ctx.app.emit('error', ctx, imageUpdateError, ctx, err)
      }
    } else {
      return ctx.app.emit('error', ctx, fileUploadError, ctx)
    }
  }

  async sendCaptcha(ctx, next) {
    const { email } = ctx.request.body
    try {
      if (await uEmail.send(email, numRandom(100000, 999999))) {
        ctx.body = ResP.success('邮件已发送')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, fileUploadError, ctx, err)
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
        ctx.body = ResP.success('密码更新成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, passwordUpdateError, ctx, err)
    }
  }
}

module.exports = new UserController()
