document.getElementById('getCaptcha').addEventListener('click', () => {
  event.preventDefault()

  var email = document.getElementById('email').value
  console.log(email)
  axios
    .post('/users/my/email', {
      email: email,
    })
    .then(function (response) {
      console.log(response)

      window.location.href = '/login'
    })
    .catch(function (error) {
      console.log(error)
    })
})

// TODO 后续完善
document.querySelector('.form').addEventListener('submit', () => {
  event.preventDefault()

  var email = document.getElementById('email').value
  console.log('submit')
  // axios
  //   .patch('/users/my/email', {
  //     email: email,
  //   })
  //   .then(function (response) {
  //     console.log(response)

  //     window.location.href = '/login'
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   })
})
