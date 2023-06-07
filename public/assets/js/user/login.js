import { doLogin } from '../axios/api.js'
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
      const { result } = response.data
      localStorage.setItem('token', result)
      window.location.href = '/index'
    })
    .catch(function (error) {
      console.log(error)
    })
})
