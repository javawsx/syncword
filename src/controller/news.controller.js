const {
  getList,
  create,
  updateById,
  deleteById,
} = require('../service/news.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')

class NewsController {
  async getList(ctx, next) {
    try {
      const res = await getList()

      if (res != null) {
        ctx.body = ResP.json('公告信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async create(ctx, next) {
    const { id, game_id, title, author, content } = ctx.request.body
    const timestamp = new Date().getTime()
    console.log(timestamp)
    try {
      const res = await create({
        id,
        game_id,
        title,
        author,
        content,
        timestamp,
      })

      if (res != null) {
        ctx.body = ResP.success('公告信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async updateById(ctx, next) {
    const { id, game_id, title, author, content } = ctx.request.body
    const timestamp = new Date().getTime()
    try {
      const res = await updateById({
        id,
        game_id,
        title,
        author,
        content,
        timestamp,
      })

      if (res) {
        ctx.body = ResP.success('公告信息更新成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async deleteById(ctx, next) {
    const id = ctx.request.body
    try {
      const res = await deleteById(id)

      if (res) {
        ctx.body = ResP.success('公告信息删除成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new NewsController()
