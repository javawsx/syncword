const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Pack = seq.define(
  'pack',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      comment: '礼包ID',
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '游戏ID',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '礼包名称',
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '描述',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '价格',
    },
    org_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '价值',
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '折扣',
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '订单数',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_pack',
  }
)

module.exports = Pack
