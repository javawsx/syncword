import { doUserImageEdit, doUserEdit, doChangePassword } from '../axios/api.js'
import {
  alertSuccess,
  alertLinkAfterSuccess,
  alertError,
} from '../axios/alerts.js'

// 修改头像模块
document
  .querySelector('.profile-img-file-input')
  .addEventListener('change', () => {
    event.preventDefault()
    var files = event.target.files
    console.log(files)
    var fd = new FormData()
    fd.append('file', files[0])
    doUserImageEdit(fd)
      .then(function (response) {
        alertLinkAfterSuccess({
          message: response.data.message,
          link: '/pages-profile-settings',
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  })

const form = document.querySelectorAll('.form')
// 修改信息模块
form[0].addEventListener('submit', () => {
  event.preventDefault()
  var username = document.getElementById('userNameInput').value
  var email = document.getElementById('emailInput').value

  doUserEdit({
    user_name: username,
    email: email,
  })
    .then(function (response) {
      alertLinkAfterSuccess({
        message: response.data.message,
        link: '/pages-profile-settings',
      })
    })
    .catch(function (error) {
      console.log(error)
    })
})
// 修改密码模块
form[1].addEventListener('submit', () => {
  event.preventDefault()
  var newPassword = document.getElementById('newpasswordInput').value
  var confirmPassword = document.getElementById('confirmpasswordInput').value

  if (newPassword === confirmPassword) {
    doChangePassword({
      password: newPassword,
    })
      .then(function (response) {
        // 密码更新成功，清除信息重新登陆
        window.localStorage.clear()
        alertLinkAfterSuccess({
          message: response.data.message,
          link: '/login',
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  } else {
    alertError('密码不一致！')
  }
})
