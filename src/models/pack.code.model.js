const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const PackCode = seq.define(
  'packCode',
  {
    pack_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '礼包ID',
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'CDK',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_pack_code',
  }
)

module.exports = PackCode
