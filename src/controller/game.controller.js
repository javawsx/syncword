const {
  getGameList,
  getSelectList,
  create,
  updateById,
  deleteById,
} = require('../service/game.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')

class GameController {
  async gameList(ctx, next) {
    try {
      const res = await getGameList()

      if (res != null) {
        ctx.body = ResP.json('游戏信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async gameSelectList(ctx, next) {
    try {
      const res = await getSelectList()
      if (res != null) {
        ctx.body = ResP.json('游戏信息下拉框数据获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async create(ctx, next) {
    const {
      game_id,
      name,
      category,
      type,
      price,
      uri,
      status,
      publisher,
      developer,
      brief,
      desc,
      url_pc,
      url_mobile,
    } = ctx.request.body
    try {
      const res = await create({
        game_id,
        name,
        category,
        type,
        price,
        uri,
        status,
        publisher,
        developer,
        brief,
        desc,
        url_pc,
        url_mobile,
      })

      if (res != null) {
        ctx.body = ResP.json('游戏信息创建成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async updateById(ctx, next) {
    const {
      game_id,
      name,
      category,
      type,
      price,
      uri,
      status,
      publisher,
      developer,
      brief,
      desc,
      url_pc,
      url_mobile,
    } = ctx.request.body
    try {
      const res = await updateById({
        game_id,
        name,
        category,
        type,
        price,
        uri,
        status,
        publisher,
        developer,
        brief,
        desc,
        url_pc,
        url_mobile,
      })

      if (res) {
        ctx.body = ResP.json('游戏信息更新成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async deleteById(ctx, next) {
    const game_id = ctx.request.body
    try {
      const res = await deleteById(game_id)

      if (res) {
        ctx.body = ResP.json('游戏信息删除成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new GameController()
