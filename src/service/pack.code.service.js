const PackCode = require('../models/pack.code.model')

class PackCodeService {
  async getList() {
    const res = await PackCode.findAll()

    return res
  }

  async create({ pack_id, code }) {
    const res = await PackCode.create({
      pack_id,
      code,
    })
    return res ? res.dataValues : null
  }

  async createBatch(data) {
    const res = await PackCode.bulkCreate(data)
    return res ? res.dataValues : null
  }

  async updateById({ id, pack_id, code }) {
    const whereOpt = { id }
    const newPackCode = {}

    pack_id && Object.assign(newPackCode, { pack_id })
    code && Object.assign(newPackCode, { code })

    const res = await PackCode.update(newPackCode, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ id }) {
    const whereOpt = { id }

    const res = await PackCode.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new PackCodeService()
