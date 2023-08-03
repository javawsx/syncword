const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const GameShop = seq.define(
  'gameServer',
  {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '游戏ID',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '名称',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '数量',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '价格',
    },
    currency: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      comment: '货币',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_game_shop',
  }
)

module.exports = GameShop
