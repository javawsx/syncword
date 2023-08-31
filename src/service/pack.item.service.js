const PackItem = require('../models/pack.item.model')

class PackItemService {
  async getList() {
    const res = await PackItem.findAll()

    return res
  }

  async create({ pack_id, name, amount, price }) {
    const res = await PackItem.create({
      pack_id,
      name,
      amount,
      price,
    })
    return res ? res.dataValues : null
  }

  async createBatch(data) {
    const res = await PackItem.bulkCreate(data)
    return res ? res : null
  }

  async updateById({ id, pack_id, name, amount, price }) {
    const whereOpt = { id }
    const newPackItem = {}

    pack_id && Object.assign(newPackItem, { pack_id })
    name && Object.assign(newPackItem, { name })
    amount && Object.assign(newPackItem, { amount })
    price && Object.assign(newPackItem, { price })

    const res = await PackItem.update(newPackItem, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ id }) {
    const whereOpt = { id }

    const res = await PackItem.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new PackItemService()
