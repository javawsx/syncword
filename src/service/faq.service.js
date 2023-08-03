const Faq = require('../models/faq.model')

class FaqService {
  async getList() {
    const res = await Faq.findAll()

    return res
  }

  async create({ faq_topic_id, title, content }) {
    const res = await Faq.create({ faq_topic_id, title, content })
    return res ? res.dataValues : null
  }

  async updateById({ id, faq_topic_id, title, content }) {
    const whereOpt = { id }
    const newFaq = {}

    faq_topic_id && Object.assign(newFaq, { faq_topic_id })
    title && Object.assign(newFaq, { title })
    content && Object.assign(newFaq, { content })

    const res = await Faq.update(newFaq, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ id }) {
    const whereOpt = { id }

    const res = await Faq.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new FaqService()
