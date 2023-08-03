const {
  getList,
  create,
  updateById,
  deleteById,
} = require('../service/game.shop.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')

class GameShopController {
  async getList(ctx, next) {
    try {
      const res = await getList()

      if (res != null) {
        ctx.body = ResP.json('游戏商品信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async create(ctx, next) {
    const { game_id, name, amount, price, currency } = ctx.request.body
    try {
      const res = await create({ game_id, name, amount, price, currency })

      if (res != null) {
        ctx.body = ResP.success('游戏商品信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async updateById(ctx, next) {
    const { id, game_id, name, amount, price, currency } = ctx.request.body
    try {
      const res = await updateById({
        id,
        game_id,
        name,
        amount,
        price,
        currency,
      })

      if (res) {
        ctx.body = ResP.success('游戏商品信息更新成功！')
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
        ctx.body = ResP.success('游戏商品信息删除成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new GameShopController()
