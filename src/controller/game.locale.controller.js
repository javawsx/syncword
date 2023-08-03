const {
  getList,
  create,
  updateById,
  deleteById,
} = require('../service/game.locale.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')

class GameLocaleController {
  async getList(ctx, next) {
    try {
      const res = await getList()
      if (res != null) {
        ctx.body = ResP.json('游戏语言信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async create(ctx, next) {
    const { game_id, locale_name, locale_id } = ctx.request.body
    try {
      const res = await create({ game_id, locale_name, locale_id })

      if (res != null) {
        ctx.body = ResP.success('游戏语言信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async updateById(ctx, next) {
    const { id, game_id, locale_name, locale_id } = ctx.request.body
    console.log(id)
    try {
      const res = await updateById({ id, game_id, locale_name, locale_id })

      if (res) {
        ctx.body = ResP.success('游戏语言信息更新成功！')
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
        ctx.body = ResP.success('游戏语言信息删除成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new GameLocaleController()
