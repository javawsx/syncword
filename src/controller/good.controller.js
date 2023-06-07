const path = require('path')

const { fileUploadError, noSupportFileType } = require('../constant/err.type')

class goodController{
  async upload(ctx, next){
    const { file }  = ctx.request.files
    const fileTypes = ['image/png','image/jpeg']
    if(file){
      if(!fileTypes.includes(file.mimetype)){
        return ctx.app.emit('error', noSupportFileType, ctx)
      }

       ctx.body = {
        code: 0,
        message: '图片上传成功！',
        result: {
          goods_img: path.basename(file.filepath),
        }
      }
    }else{
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }
}

module.exports = new goodController()