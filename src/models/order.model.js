const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Order = seq.define(
  'order',
  {
    order_no: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '订单号',
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '类别',
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: '时间',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '状态',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '用户ID',
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '游戏ID',
    },
    server_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '服务器ID',
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '商品ID',
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '商品名称',
    },
    product_desc: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '商品描述',
    },
    currency: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      comment: '货币',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '数量',
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '余额',
    },
    end_balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '结束后余额',
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '验证',
    },
    external_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'external_id',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_order',
  }
)

module.exports = Order
