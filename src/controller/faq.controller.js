const logger = require('../middleware/logger.middleware')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')
const {
  getList,
  create,
  updateById,
  deleteById,
} = require('../service/faq.service')

class FaqController {
  async getList(ctx, next) {
    try {
      const res = await getList()

      if (res != null) {
        ctx.body = ResP.json('常规问题信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async create(ctx, next) {
    const { faq_topic_id, title, content } = ctx.request.body
    try {
      const res = await create({ faq_topic_id, title, content })

      if (res != null) {
        ctx.body = ResP.success('常规问题信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async updateById(ctx, next) {
    const { id, faq_topic_id, title, content } = ctx.request.body
    try {
      const res = await updateById({ id, faq_topic_id, title, content })

      if (res) {
        ResP.success('常规问题信息更新成功！')
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
        ResP.success('常规问题信息删除成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new FaqController()
