const nodemailer = require('nodemailer')
const self = { user: 'oookay_op2@126.com', password: 'oookay' }

module.exports = {
  async send(address, code) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.126.com',
      port: 465,
      secure: true,
      auth: {
        user: self.user,
        password: self.password,
      },
    })

    const info = await transporter.sendMail({
      from: 'oookay_op2@126.com',
      to: '4893547242qq.com',
      subject: '更改密码邮箱验证',
      text: '你的账号正在更改密码，验证码是' + code,
    })
  },
}
