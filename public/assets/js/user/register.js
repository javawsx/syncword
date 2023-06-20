import { doRegister } from '../axios/api.js'
import { alertLinkAfterSuccess, alertError } from '../axios/alerts.js'
document.querySelector('.form').addEventListener('submit', () => {
  event.preventDefault()

  var email = document.getElementById('useremail').value
  var username = document.getElementById('username').value
  var password = document.getElementById('password-input').value
  var user_image = 'avatar-3.jpg'
  doRegister({
    user_name: username,
    password: password,
    email: email,
    user_image: user_image,
  })
    .then(function (response) {
      console.log(response)
      if (response.data.code !== 0) {
        alertError('注册失败！')
      }
      alertLinkAfterSuccess({
        message: '注册成功！',
        link: '/login',
      })
    })
    .catch(function (error) {
      alertError(error.response.data.message)
    })
})
