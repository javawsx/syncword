const {
  getList,
  create,
  updateById,
  deleteById,
} = require('../service/shop.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')

class ShopController {
  async getList(ctx, next) {
    try {
      const res = await getList()

      if (res != null) {
        ctx.body = ResP.json('商品信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async create(ctx, next) {
    const { gold, price, name, desc } = ctx.request.body
    try {
      const res = await create({ gold, price, name, desc })

      if (res != null) {
        ctx.body = ResP.success('商品信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async updateById(ctx, next) {
    const { id, gold, price, name, desc } = ctx.request.body
    try {
      const res = await updateById({
        id,
        gold,
        price,
        name,
        desc,
      })

      if (res) {
        ctx.body = ResP.success('商品信息更新成功！')
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
        ctx.body = ResP.success('商品信息删除成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new ShopController()
