const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const FaqTopic = seq.define(
  'faqTopic',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标题',
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '内容',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_faq_topic',
  }
)

module.exports = FaqTopic
