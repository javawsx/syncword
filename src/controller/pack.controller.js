const {
  getList,
  getSelectList,
  create,
  updateById,
  deleteById,
} = require('../service/pack.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')

class PackController {
  async getList(ctx, next) {
    try {
      const res = await getList()

      if (res != null) {
        ctx.body = ResP.json('礼包信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async getSelectList(ctx, next) {
    try {
      const res = await getSelectList()

      if (res != null) {
        ctx.body = ResP.json('礼包信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async create(ctx, next) {
    const { id, game_id, name, desc, price, org_price, discount, order } =
      ctx.request.body
    try {
      console.log(id)
      const res = await create({
        id,
        game_id,
        name,
        desc,
        price,
        org_price,
        discount,
        order,
      })

      if (res != null) {
        ctx.body = ResP.success('礼包信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async updateById(ctx, next) {
    const { id, game_id, name, desc, price, org_price, discount, order } =
      ctx.request.body
    try {
      const res = await updateById({
        id,
        game_id,
        name,
        desc,
        price,
        org_price,
        discount,
        order,
      })

      if (res) {
        ctx.body = ResP.success('礼包信息修改成功！')
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
        ctx.body = ResP.success('礼包信息删除成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new PackController()
