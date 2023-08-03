const GameLocale = require('../models/game.locale.model')

class GameLocaleService {
  async getList() {
    const res = await GameLocale.findAll()

    return res
  }

  async create({ game_id, locale_name, locale_id }) {
    const res = await GameLocale.create({ game_id, locale_name, locale_id })
    return res ? res.dataValues : null
  }

  async updateById({ id, game_id, locale_name, locale_id }) {
    const whereOpt = { id }
    const newGameLocale = {}

    game_id && Object.assign(newGameLocale, { game_id })
    locale_name && Object.assign(newGameLocale, { locale_name })
    locale_id && Object.assign(newGameLocale, { locale_id })

    const res = await GameLocale.update(newGameLocale, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ id }) {
    const whereOpt = { id }

    const res = await GameLocale.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new GameLocaleService()
