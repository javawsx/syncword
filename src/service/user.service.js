const User = require('../models/user.model')

class UserService {
  async createUser(user_name, password, email, user_image) {
    //TODO 数据库操作
    const res = await User.create({ user_name, password, email, user_image })
    // 返回执行结果数据
    return res.dataValues
  }

  async getUserInfo({ id, user_name, password, email, is_admin }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    email && Object.assign(whereOpt, { email })
    is_admin && Object.assign(whereOpt, { is_admin })

    // 查询
    const res = await User.findOne({
      attributes: [
        'id',
        'user_name',
        'password',
        'email',
        'user_image',
        'is_admin',
      ],
      where: whereOpt,
    })

    return res ? res.dataValues : null
  }

  async updateById({ id, user_name, password, email, user_image, is_admin }) {
    const whereOpt = { id }
    const newUser = {}

    user_name && Object.assign(newUser, { user_name })
    password && Object.assign(newUser, { password })
    email && Object.assign(newUser, { email })
    user_image && Object.assign(newUser, { user_image })
    is_admin && Object.assign(newUser, { is_admin })

    const res = await User.update(newUser, { where: whereOpt })

    return res[0] > 0 ? true : false
  }
}

module.exports = new UserService()
