const {
  getList,
  create,
  updateById,
  deleteById,
  createBatch,
} = require('../service/pack.code.service')
const ResP = require('../app/resHandler')
const { operatorError } = require('../constant/err.type')
const path = require('path')
const xlsx = require('node-xlsx')

class PackCodeController {
  async getList(ctx, next) {
    try {
      const res = await getList()

      if (res != null) {
        ctx.body = ResP.json('礼包码信息获取成功！', res)
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async create(ctx, next) {
    const { pack_id, code } = ctx.request.body
    try {
      const res = await create({
        pack_id,
        code,
      })

      if (res != null) {
        ctx.body = ResP.success('礼包码信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async createBatch(ctx, next) {
    const { file } = ctx.request.files

    if (file) {
      // 读取xlsx，此处可以按照需求更改自己要读的表格
      const sheets = xlsx.parse(file.filepath)
      // 循环读取xlsx的sheet数据
      const sheetData = []
      sheets.forEach((item) => {
        item.data.forEach((code) => {
          sheetData.push({ code: code[0], pack_id: code[1] })
        })
      })
      try {
        const res = await createBatch(sheetData)
        if (res != null) {
          ctx.body = ResP.success('礼包码信息批量添加成功！')
        }
      } catch (err) {
        return ctx.app.emit('error', ctx, '导入失败:' + err.name, err)
      }
    } else {
      return ctx.app.emit('error', ctx, '上传失败', ctx)
    }
  }

  async updateById(ctx, next) {
    const { id, pack_id, code } = ctx.request.body
    try {
      const res = await updateById({
        id,
        pack_id,
        code,
      })

      if (res) {
        ctx.body = ResP.success('礼包码信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }

  async deleteById(ctx, next) {
    const id = ctx.request.body
    try {
      const res = await deleteById(id)

      if (res) {
        ctx.body = ResP.success('礼包码信息添加成功！')
      }
    } catch (err) {
      return ctx.app.emit('error', ctx, operatorError, err)
    }
  }
}

module.exports = new PackCodeController()
