const jwt = require('jsonwebtoken')
const { createUser, getUserInfo, updateById} = require("../service/user.service")
const { userRegisterError} = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')

class UserController{
    async register(ctx, next){
        // 1.获取参数
        const {user_name, password, email} = ctx.request.body

        try{
             // 2.数据库处理
            const res = await createUser(user_name, password, email)

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
      const { user_name } = ctx.request.body

      // 1.获取用户信息(在token的playLoad中，记录id,user_name,is_admin)
      try {
        // 从返回结果中剔除password和email
        const {password, email, ...res} = await getUserInfo({ user_name})

        ctx.body = {
          code:0,
          message: "用户登录成功！",
          result: jwt.sign(res, JWT_SECRET, { expiresIn: "1d"})
        }
      } catch (err) {
        console.error("用户登录失败！", err)
      }
    }

    async changePassword(ctx ,next){
      // 1.根据请求数据头获取用户ID
      const password = ctx.request.body.password
      const id = ctx.state.user.id

      // 2.根据ID更新数据库里密码信息
      try {
         if(await updateById({id, password})){
          // 3.返回结果
          ctx.body ={
            code: 0,
            message: '密码更新成功！',
            result: ''
          }
        }
      } catch (err) {
        console.error("密码更新失败！", err)
      }
    }
}

module.exports = new UserController()