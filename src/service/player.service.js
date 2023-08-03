const Player = require('../models/player.model')

class PlayerService {
  async getPlayerList() {
    const res = await Player.findAll({
      attributes: { exclude: ['hashed_password'] },
    })

    return res
  }

  async getPlayerInfo({ id, email, user_name, avatar, gold, email_verified }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    email && Object.assign(whereOpt, { email })
    user_name && Object.assign(whereOpt, { user_name })
    avatar && Object.assign(whereOpt, { avatar })
    gold && Object.assign(whereOpt, { gold })
    email_verified && Object.assign(whereOpt, { email_verified })

    // 查询
    const res = await Player.findOne({
      attributes: [
        'id',
        'email',
        'hashed_password',
        'user_name',
        'avatar',
        'gold',
        'email_verified',
      ],
      where: whereOpt,
    })

    return res ? res.dataValues : null
  }

  async updateById({
    id,
    email,
    hashed_password,
    user_name,
    avatar,
    gold,
    email_verified,
  }) {
    const whereOpt = { id }
    const newPlayer = {}

    id && Object.assign(newPlayer, { id })
    email && Object.assign(newPlayer, { email })
    hashed_password && Object.assign(newPlayer, { hashed_password })
    user_name && Object.assign(newPlayer, { user_name })
    avatar && Object.assign(newPlayer, { avatar })
    gold && Object.assign(newPlayer, { gold })
    email_verified && Object.assign(newPlayer, { email_verified })

    const res = await Player.update(newPlayer, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ id }) {
    const whereOpt = { id }

    const res = await Player.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new PlayerService()
