const GameShop = require('../models/game.shop.model')

class GameShopService {
  async getList() {
    const res = await GameShop.findAll()

    return res
  }

  async create({ game_id, name, amount, price, currency }) {
    const res = await GameShop.create({
      game_id,
      name,
      amount,
      price,
      currency,
    })
    return res ? res.dataValues : null
  }

  async updateById({ id, game_id, name, amount, price, currency }) {
    const whereOpt = { id }
    const newGameShop = {}

    id && Object.assign(newGameShop, { id })
    game_id && Object.assign(newGameShop, { game_id })
    name && Object.assign(newGameShop, { name })
    amount && Object.assign(newGameShop, { amount })
    price && Object.assign(newGameShop, { price })
    currency && Object.assign(newGameShop, { currency })

    const res = await GameShop.update(newGameShop, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ id }) {
    const whereOpt = { id }

    const res = await GameShop.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new GameShopService()
