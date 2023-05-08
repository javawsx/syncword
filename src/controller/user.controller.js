const { createUser} = require("../service/user.service")
const { userRegisterError} = require('../constant/err.type')
class UserController{
    async register(ctx, next){
        // 1.获取参数
        const {user_name, password} = ctx.request.body

        try{
             // 2.数据库处理
            const res = await createUser(user_name, password)

            // 3.返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功！',
                result: {
                    id: res.id,
                    user_name: res.user_name
                },
            }  
        }catch(err){
            console.log(err);
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    async login(ctx, next){
        ctx.body = '登录成功！'
    }
}

module.exports = new UserController()