const Pack = require('../models/pack.model')

class PackService {
  async getList() {
    const res = await Pack.findAll()

    return res
  }

  async getSelectList() {
    const res = await Pack.findAll({
      attributes: [
        ['id', 'id'],
        ['name', 'text'],
      ],
    })

    return res
  }

  async create({ id, game_id, name, desc, price, org_price, discount, order }) {
    const res = await Pack.create({
      id,
      game_id,
      name,
      desc,
      price,
      org_price,
      discount,
      order,
    })

    return res ? res.dataValues : null
  }

  async updateById({
    id,
    game_id,
    name,
    desc,
    price,
    org_price,
    discount,
    order,
  }) {
    const whereOpt = { id }
    const newPack = {}

    game_id && Object.assign(newPack, { game_id })
    name && Object.assign(newPack, { name })
    desc && Object.assign(newPack, { desc })
    price && Object.assign(newPack, { price })
    org_price && Object.assign(newPack, { org_price })
    discount && Object.assign(newPack, { discount })
    order && Object.assign(newPack, { order })

    const res = await Pack.update(newPack, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ id }) {
    const whereOpt = { id }

    const res = await Pack.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new PackService()
