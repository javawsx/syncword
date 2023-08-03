const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const PackItem = seq.define(
  'packItem',
  {
    pack_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '礼包ID',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '道具名称',
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
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_pack_item',
  }
)

module.exports = PackItem
