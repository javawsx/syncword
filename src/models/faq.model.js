const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Faq = seq.define(
  'faq',
  {
    faq_topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      comment: 'faqID',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标题',
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '内容',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_faq',
  }
)

module.exports = Faq
