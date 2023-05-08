const Validator = require('validator')
const {getUserInfo} = require('../service/user.service')
const {userFormateError, userAlreadyExisted, userRegisterError} = require('../constant/err.type')

// 验证参数合法性
const userValidator = async (ctx,next)=>{
     const {user_name, password} = ctx.request.body
    
    if(Validator.isEmpty(user_name) || Validator.isEmpty(password)){
        console.error('用户名或者密码不能为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }

    await next()
}

// 验证注册时用户名是否已经存在
const verifyUser = async (ctx,next) =>{
    const {user_name, password} = ctx.request.body

    try {
        const res = await getUserInfo({user_name})

        if(res){
            ctx.app.emit('error', userAlreadyExisted, ctx)
            return
        }
    } catch (error) {
        console.error('获取用户信息错误', error);
        ctx.app.emit('error', userRegisterError, ctx)
    }
}

module.exports = {
    userValidator,
    verifyUser,
}