const {
  getList,
  create,
  updateById,
  deleteById,
} = require('../service/game.server.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')

class GameServerController {
  async getList(ctx, next) {
    try {
      const res = await getList()

      if (res != null) {
        ctx.body = ResP.json('游戏服务器信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async create(ctx, next) {
    const { game_id, server_id, server_name } = ctx.request.body
    try {
      const res = await create({ game_id, server_id, server_name })

      if (res != null) {
        ctx.body = ResP.success('游戏服务器信息创建成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async updateById(ctx, next) {
    const { id, game_id, server_name, server_id } = ctx.request.body
    try {
      const res = await updateById({ id, game_id, server_name, server_id })

      if (res) {
        ctx.body = ResP.success('游戏服务器信息更新成功！')
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
        ctx.body = ResP.success('游戏服务器信息删除成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new GameServerController()
