const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const User = seq.define('zd_user', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "用户名,唯一"
    },
    password: {
        type: DataTypes.CHAR,
        allowNull: false,
        comment: "密码"
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        comment: "邮件"
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: "是否是管理员,0不是管理员(默认),1 是管理员"
    }
},{
    // 时间戳默认true加
    timestamps:true
})

// 强制同步数据表(创建数据表)
// User.sync({ force:true })

module.exports = User