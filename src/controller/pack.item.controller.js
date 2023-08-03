const {
  getList,
  create,
  updateById,
  deleteById,
} = require('../service/pack.item.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')

class PackItemController {
  async getList(ctx, next) {
    try {
      const res = await getList()

      if (res != null) {
        ctx.body = ResP.json('礼包道具信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async create(ctx, next) {
    const { pack_id, name, amount, price } = ctx.request.body
    try {
      const res = await create({
        pack_id,
        name,
        amount,
        price,
      })

      if (res != null) {
        ctx.body = ResP.success('礼包道具信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async updateById(ctx, next) {
    const { id, pack_id, name, amount, price } = ctx.request.body
    try {
      const res = await updateById({
        id,
        pack_id,
        name,
        amount,
        price,
      })

      if (res) {
        ctx.body = ResP.success('礼包道具信息添加成功！')
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
        ctx.body = ResP.success('礼包道具信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new PackItemController()
