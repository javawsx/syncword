const News = require('../models/news.model')

class NewsService {
  async getList() {
    const res = await News.findAll()

    return res
  }

  async create({ id, game_id, title, author, content, timestamp }) {
    const res = await News.create({
      id,
      game_id,
      title,
      author,
      content,
      timestamp,
    })
    return res ? res.dataValues : null
  }

  async updateById({ id, game_id, title, author, content, timestamp }) {
    const whereOpt = { id }
    const newNews = {}

    id && Object.assign(newNews, { id })
    title && Object.assign(newNews, { title })
    game_id && Object.assign(newNews, { game_id })
    author && Object.assign(newNews, { author })
    content && Object.assign(newNews, { content })
    timestamp && Object.assign(newNews, { timestamp })

    const res = await News.update(newNews, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ id }) {
    const whereOpt = { id }

    const res = await News.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new NewsService()
