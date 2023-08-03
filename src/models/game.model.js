const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Game = seq.define(
  'game',
  {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: '游戏ID',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户名',
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '种类',
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '类别',
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      comment: '价格',
    },
    uri: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '路径',
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: '状态',
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '发布者',
    },
    developer: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '开发者',
    },
    brief: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '摘要',
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '描述',
    },
    url_pc: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'PC路径',
    },
    url_mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'MOBILE路径',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_game',
  }
)

module.exports = Game
