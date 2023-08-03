const Shop = require('../models/shop.model')

class ShopService {
  async getList() {
    const res = await Shop.findAll()

    return res
  }

  async create({ gold, price, name, desc }) {
    const res = await Shop.create({
      gold,
      price,
      name,
      desc,
    })
    return res ? res.dataValues : null
  }

  async updateById({ id, gold, price, name, desc }) {
    const whereOpt = { id }
    const newShop = {}

    id && Object.assign(newShop, { id })
    price && Object.assign(newShop, { price })
    gold && Object.assign(newShop, { gold })
    name && Object.assign(newShop, { name })
    desc && Object.assign(newShop, { desc })

    const res = await Shop.update(newShop, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ id }) {
    const whereOpt = { id }

    const res = await Shop.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new ShopService()
