const FaqTopic = require('../models/faq.topic.model')

class FaqTopicService {
  async getList() {
    const res = await FaqTopic.findAll()

    return res
  }

  async getSelectList() {
    const res = await FaqTopic.findAll({
      attributes: [
        ['id', 'id'],
        ['title', 'text'],
      ],
    })

    return res
  }

  async create({ title, section }) {
    const res = await FaqTopic.create({ title, section })
    return res ? res.dataValues : null
  }

  async updateById({ id, title, section }) {
    const whereOpt = { id }
    const newFaqTopic = {}

    title && Object.assign(newFaqTopic, { title })
    section && Object.assign(newFaqTopic, { section })

    const res = await FaqTopic.update(newFaqTopic, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ id }) {
    const whereOpt = { id }

    const res = await FaqTopic.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new FaqTopicService()
