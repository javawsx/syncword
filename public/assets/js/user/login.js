import { doLogin } from '../axios/api.js'
import { alertError, alertAuto } from '../axios/alerts.js'
document.querySelector('.form').addEventListener('submit', () => {
  event.preventDefault()
  var username = document.getElementById('username').value
  var password = document.getElementById('userpassword').value

  doLogin({
    user_name: username,
    password: password,
  })
    .then(function (response) {
      console.log(response)
      const { result, message } = response.data
      localStorage.setItem('token', result)
      alertAuto(message)
      window.location.href = '/index'
    })
    .catch(function (error) {
      alertError(error.response.data.message)
    })
})
