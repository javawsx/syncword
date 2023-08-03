const {
  getOrderList,
  getOrderInfo,
  getChargeOrderData,
  getGameOrderData,
  getChartData,
  getSearchOrderList,
} = require('../service/order.service')
const { getGameList } = require('../service/game.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')
const moment = require('moment')

class OrderController {
  async OrderInfo(ctx, next) {
    const { id } = ctx.request.body
    // 1.获取订单信息
    try {
      const res = await getOrderInfo({ id })

      if (res != null) {
        ctx.body = ResP.json('订单信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async orderList(ctx, next) {
    try {
      const res = await getOrderList()

      if (res != null) {
        ctx.body = ResP.json('订单信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async searchOrderList(ctx, next) {
    const { order_no, type, status, user_id, game_id, startDate, endDate } =
      ctx.request.body
    try {
      const res = await getSearchOrderList({
        order_no,
        type,
        status,
        user_id,
        game_id,
        startDate,
        endDate,
      })
      if (res != null) {
        ctx.body = ResP.json('订单信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async orderData(ctx, next) {
    try {
      // 统计当天订单
      const startDate = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
      const endDate = startDate + 24 * 60 * 60 * 1000
      const chargeRes = await getChargeOrderData(startDate, endDate)
      const gameRes = await getGameOrderData(startDate, endDate)
      if (chargeRes != null && gameRes != null) {
        ctx.body = ResP.json('订单统计信息获取成功！', {
          charge: chargeRes[0].dataValues,
          game: gameRes[0].dataValues,
        })
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async chartData(ctx, next) {
    const { type } = ctx.request.body
    try {
      // 获取7，15，30图表数据
      const chargeMData = []
      const chargeOData = []
      const gameMData = []
      const gameOData = []
      const date = new Date()
      const dayBegin = new Date(1676791671343).getTime()
      if (type != null) {
        for (let index = type - 1; index >= 0; index--) {
          const startDate = dayBegin - 24 * 60 * 60 * 1000 * index
          const endDate = startDate + 24 * 60 * 60 * 1000
          const day = moment(startDate).format('YYYY-MM-DD')
          const chargeRes = await getChargeOrderData(startDate, endDate)
          const gameRes = await getGameOrderData(startDate, endDate)
          if (chargeRes != null && gameRes != null) {
            chargeMData.push({
              x: day,
              y:
                chargeRes[0].dataValues.money != null
                  ? chargeRes[0].dataValues.money
                  : 0,
            })
            chargeOData.push({
              x: day,
              y:
                chargeRes[0].dataValues.orders != null
                  ? chargeRes[0].dataValues.orders
                  : 0,
            })
            gameMData.push({
              x: day,
              y:
                gameRes[0].dataValues.money != null
                  ? gameRes[0].dataValues.money
                  : 0,
            })
            gameOData.push({
              x: day,
              y:
                gameRes[0].dataValues.orders != null
                  ? gameRes[0].dataValues.orders
                  : 0,
            })
          }
        }
      }

      // 时间段
      ctx.body = ResP.json('订单图表信息获取成功！', {
        chargeMoney: chargeMData,
        chargeOrder: chargeOData,
        gameMoney: gameMData,
        gameOrder: gameOData,
      })
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async donutData(ctx, next) {
    const { type } = ctx.request.body
    try {
      // 获取环表数据
      const dData = []
      const lData = []
      const date = new Date()
      const dayBegin = new Date(1676791671343).getTime()
      if (type != null) {
        const dayEnd = dayBegin - 24 * 60 * 60 * 1000 * type
        const donut = await getChartData(dayEnd, dayBegin)
        const res = await getGameList()
        donut.forEach((item) => {
          dData.push(Number(item.dataValues.money))

          // 循环获取游戏名字
          res.forEach((game) => {
            if (game.game_id == item.dataValues.game_id) {
              lData.push(game.name)
            }
          })
        })
      }
      // 时间段
      ctx.body = ResP.json('订单图表信息获取成功！', {
        label: lData,
        donut: dData,
      })
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new OrderController()
