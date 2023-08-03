const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Shop = seq.define(
  'gameServer',
  {
    gold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '金币',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '价格',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '名称',
    },
    desc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '描述',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_shop',
  }
)

module.exports = Shop
