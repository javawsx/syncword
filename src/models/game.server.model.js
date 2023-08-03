const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const GameServer = seq.define(
  'gameServer',
  {
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
    server_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '服务器名称',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_game_server',
  }
)

module.exports = GameServer
