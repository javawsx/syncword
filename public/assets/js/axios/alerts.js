export const alertSuccess = (data) => {
  Swal.fire({
    title: 'Good job!',
    text: data.message,
    icon: 'success',
    confirmButtonClass: 'btn btn-primary w-xs me-2 mt-2',
    buttonsStyling: !1,
    showCloseButton: !0,
  })
}

export const alertLinkAfterSuccess = (data) => {
  Swal.fire({
    title: 'Good job!',
    text: data.message,
    icon: 'success',
    confirmButtonClass: 'btn btn-primary w-xs me-2 mt-2',
    buttonsStyling: !1,
    preConfirm: function (n) {
      if (data.link) {
        window.location.href = data.link
      }
    },
    showCloseButton: !0,
    didClose: function (n) {
      if (data.link) {
        window.location.href = data.link
      }
    },
  })
}

export const alertError = (data) => {
  Swal.fire({
    title: 'Error:',
    text: data,
    icon: 'error',
    confirmButtonClass: 'btn btn-primary w-xs mt-2',
    buttonsStyling: !1,
    footer: '',
    showCloseButton: !0,
  })
}

export const alertAuto = (data) => {
  var t
  Swal.fire({
    title: 'Success',
    text: data,
    timer: 4e2,
    timerProgressBar: !0,
    showCloseButton: !0,
    didOpen: function () {
      Swal.showLoading(),
        (t = setInterval(function () {
          var t = Swal.getHtmlContainer()
          t &&
            (t = t.querySelector('b')) &&
            (t.textContent = Swal.getTimerLeft())
        }, 100))
    },
    onClose: function () {
      clearInterval(t)
    },
  }).then(function (t) {
    t.dismiss === Swal.DismissReason.timer
  })
}
