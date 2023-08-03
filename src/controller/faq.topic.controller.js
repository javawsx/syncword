const {
  getList,
  create,
  updateById,
  deleteById,
  getSelectList,
} = require('../service/faq.topic.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')

class FaqTopicController {
  async getList(ctx, next) {
    try {
      const res = await getList()

      if (res != null) {
        ctx.body = ResP.json('问题主题信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async getSelectList(ctx, next) {
    try {
      const res = await getSelectList()

      if (res != null) {
        ctx.body = ResP.json('问题主题下拉框数据获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async create(ctx, next) {
    const { title, section } = ctx.request.body
    try {
      const res = await create({ title, section })

      if (res) {
        ctx.body = ResP.success('问题主题信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async updateById(ctx, next) {
    const { id, title, section } = ctx.request.body
    try {
      const res = await updateById({ id, title, section })

      if (res) {
        ctx.body = ResP.success('问题主题信息更新成功！')
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
        ctx.body = ResP.success('问题主题信息删除成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new FaqTopicController()
