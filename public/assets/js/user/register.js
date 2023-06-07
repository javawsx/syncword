import { doRegister } from '../axios/api.js'
document.querySelector('.form').addEventListener('submit', () => {
  event.preventDefault()

  var email = document.getElementById('useremail').value
  var username = document.getElementById('username').value
  var password = document.getElementById('password-input').value
  doRegister({
    user_name: username,
    password: password,
    email: email,
  })
    .then(function (response) {
      console.log(response)
      if (response.data.code !== 0) {
        return alert('注册失败！')
      }
      alert('注册成功！')
      window.location.href = '/login'
    })
    .catch(function (error) {
      console.log(error)
    })
})
