const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const News = seq.define(
  'news',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      comment: '公告ID',
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '游戏ID',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标题',
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '作者',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '内容',
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: '时间',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_news',
  }
)

module.exports = News
