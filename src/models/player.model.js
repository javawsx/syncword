const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Player = seq.define(
  'player',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '邮件',
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户名',
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '密码',
    },
    avatar: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '用户头像',
    },
    gold: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '金币',
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '邮箱验证',
    },
  },
  {
    // 时间戳默认true加
    timestamps: false,
    freezeTableName: true,
    tableName: 'tbl_user',
  }
)

module.exports = Player
