const Order = require('../models/order.model')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
class OrderService {
  async getOrderList() {
    const res = await Order.findAll()

    return res
  }

  async getSearchOrderList({
    order_no,
    type,
    status,
    user_id,
    game_id,
    startDate,
    endDate,
  }) {
    const whereOpt = {}
    if (order_no != '')
      Object.assign(whereOpt, {
        order_no: {
          [Op.eq]: order_no,
        },
      })
    if (type != '' && type != 'all')
      Object.assign(whereOpt, {
        type: {
          [Op.eq]: type,
        },
      })
    if (user_id != '')
      Object.assign(whereOpt, {
        user_id: {
          [Op.eq]: user_id,
        },
      })
    if (status != '' && status != 'all')
      Object.assign(whereOpt, {
        status: {
          [Op.eq]: status,
        },
      })
    if (game_id != '' && game_id != 'all')
      Object.assign(whereOpt, {
        game_id: {
          [Op.eq]: game_id,
        },
      })
    if (startDate != '' && endDate != '' && startDate < endDate)
      Object.assign(whereOpt, {
        timestamp: {
          [Op.between]: [startDate, endDate],
        },
      })

    const res = await Order.findAll({
      where: whereOpt,
    })

    return res
  }

  async getChargeOrderData(startDate, endDate) {
    // 根据时间段查询 type =1 的平台充值订单
    // SELECT SUM(currency) AS 'money',COUNT(order_no) AS 'order' FROM tbl_order WHERE TIMESTAMP>=1674404566048 AND TIMESTAMP<=1675085590491
    const res = await Order.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('currency')), 'money'],
        [sequelize.fn('COUNT', sequelize.col('order_no')), 'orders'],
      ],
      where: {
        type: {
          [Op.eq]: 1,
        },
        timestamp: {
          [Op.between]: [startDate, endDate],
        },
      },
    })

    return res
  }

  async getGameOrderData(startDate, endDate) {
    // 根据时间段查询 type不为1的 消费订单
    // SELECT SUM(currency) AS 'money',COUNT(order_no) AS 'order' FROM tbl_order WHERE TIMESTAMP>=1674404566048 AND TIMESTAMP<=1675085590491
    const res = await Order.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('currency')), 'money'],
        [sequelize.fn('COUNT', sequelize.col('order_no')), 'orders'],
      ],
      where: {
        type: {
          [Op.ne]: 1,
        },
        timestamp: {
          [Op.between]: [startDate, endDate],
        },
      },
    })

    return res
  }

  async getChartData(startDate, endDate) {
    // 根据时间段查询 SELECT game_id,SUM(currency) FROM tbl_order GROUP BY game_id
    const res = await Order.findAll({
      attributes: [
        'game_id',
        [sequelize.fn('SUM', sequelize.col('currency')), 'money'],
      ],
      where: {
        game_id: {
          [Op.ne]: 0,
        },
        timestamp: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: 'game_id',
    })

    return res
  }

  async getOrderInfo({
    id,
    order_no,
    type,
    timestamp,
    status,
    user_id,
    server_id,
    product_id,
    product_name,
    product_desc,
    currency,
    amount,
    balance,
    end_balance,
    token,
    external_id,
  }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    order_no && Object.assign(whereOpt, { order_no })
    type && Object.assign(whereOpt, { type })
    timestamp && Object.assign(whereOpt, { timestamp })
    status && Object.assign(whereOpt, { status })
    user_id && Object.assign(whereOpt, { user_id })
    server_id && Object.assign(whereOpt, { server_id })
    product_id && Object.assign(whereOpt, { product_id })
    product_name && Object.assign(whereOpt, { product_name })
    product_desc && Object.assign(whereOpt, { product_desc })
    currency && Object.assign(whereOpt, { currency })
    amount && Object.assign(whereOpt, { amount })
    balance && Object.assign(whereOpt, { balance })
    end_balance && Object.assign(whereOpt, { end_balance })
    token && Object.assign(whereOpt, { token })
    external_id && Object.assign(whereOpt, { external_id })

    // 查询
    const res = await Order.findOne({
      attributes: [
        'id',
        'order_no',
        'type',
        'timestamp',
        'status',
        'user_id',
        'server_id',
        'product_id',
        'product_name',
        'product_desc',
        'currency',
        'amount',
        'balance',
        'end_balance',
        'token',
        'external_id',
      ],
      where: whereOpt,
    })

    return res ? res.dataValues : null
  }

  async updateById({
    id,
    order_no,
    type,
    timestamp,
    status,
    user_id,
    server_id,
    product_id,
    product_name,
    product_desc,
    currency,
    amount,
    balance,
    end_balance,
    token,
    external_id,
  }) {
    const whereOpt = { id }
    const newOrder = {}

    id && Object.assign(newOrder, { id })
    order_no && Object.assign(newOrder, { order_no })
    type && Object.assign(newOrder, { type })
    timestamp && Object.assign(newOrder, { timestamp })
    status && Object.assign(newOrder, { status })
    user_id && Object.assign(newOrder, { user_id })
    server_id && Object.assign(newOrder, { server_id })
    product_id && Object.assign(newOrder, { product_id })
    product_name && Object.assign(newOrder, { product_name })
    product_desc && Object.assign(newOrder, { product_desc })
    currency && Object.assign(newOrder, { currency })
    amount && Object.assign(newOrder, { amount })
    balance && Object.assign(newOrder, { balance })
    end_balance && Object.assign(newOrder, { end_balance })
    token && Object.assign(newOrder, { token })
    external_id && Object.assign(newOrder, { external_id })

    const res = await Order.update(newOrder, { where: whereOpt })

    return res[0] > 0 ? true : false
  }
}

module.exports = new OrderService()
