const {
  getPlayerList,
  getPlayerInfo,
  updateById,
  deleteById,
} = require('../service/player.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')

class PlayerController {
  async playerInfo(ctx, next) {
    const { id } = ctx.request.body
    // 1.获取玩家信息
    try {
      // 从返回结果中剔除password
      const { hashed_password, ...res } = await getPlayerInfo({ id })

      if (res != null) {
        ctx.body = ResP.json('玩家信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async playerList(ctx, next) {
    try {
      const res = await getPlayerList()

      if (res != null) {
        ctx.body = ResP.json('玩家信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async updateById() {
    const { id, email, user_name, avatar, email_verified } = ctx.request.body
    try {
      const res = await updateById({
        id,
        email,
        user_name,
        avatar,
        email_verified,
      })

      if (res) {
        ctx.body = ResP.success('玩家信息更新成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async deleteById() {
    const id = ctx.request.body
    try {
      const res = await deleteById(id)

      if (res) {
        ctx.body = ResP.success('玩家信息删除成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new PlayerController()
