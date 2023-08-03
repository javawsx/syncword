const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const GameLocale = seq.define(
  'gameLocal',
  {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '游戏ID',
    },
    locale_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '语言',
    },
    locale_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '语言ID',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_game_locale',
  }
)

module.exports = GameLocale
