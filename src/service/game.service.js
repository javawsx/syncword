const Game = require('../models/game.model')

class GameService {
  async getGameList() {
    const res = await Game.findAll()

    return res
  }

  async getGameById(game_id) {
    const whereOpt = game_id

    // 查询
    const res = await Game.findOne({
      where: whereOpt,
    })
    return res ? res.dataValues : null
  }

  async getSelectList() {
    const res = await Game.findAll({
      attributes: [
        ['game_id', 'id'],
        ['name', 'text'],
      ],
    })

    return res
  }

  async create({
    game_id,
    name,
    category,
    type,
    price,
    uri,
    status,
    publisher,
    developer,
    brief,
    desc,
    url_pc,
    url_mobile,
  }) {
    const res = await Game.create({
      game_id,
      name,
      category,
      type,
      price,
      uri,
      status,
      publisher,
      developer,
      brief,
      desc,
      url_pc,
      url_mobile,
    })

    return res ? res.attributes : null
  }

  async updateById({
    game_id,
    name,
    category,
    type,
    price,
    uri,
    status,
    publisher,
    developer,
    brief,
    desc,
    url_pc,
    url_mobile,
  }) {
    const whereOpt = { game_id }
    const newGame = {}

    game_id && Object.assign(newGame, { game_id })
    name && Object.assign(newGame, { name })
    type && Object.assign(newGame, { type })
    category && Object.assign(newGame, { category })
    status && Object.assign(newGame, { status })
    price && Object.assign(newGame, { price })
    uri && Object.assign(newGame, { uri })
    publisher && Object.assign(newGame, { publisher })
    developer && Object.assign(newGame, { developer })
    brief && Object.assign(newGame, { brief })
    desc && Object.assign(newGame, { desc })
    url_pc && Object.assign(newGame, { url_pc })
    url_mobile && Object.assign(newGame, { url_mobile })

    const res = await Game.update(newGame, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ game_id }) {
    const whereOpt = { game_id }

    const res = await Game.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new GameService()
