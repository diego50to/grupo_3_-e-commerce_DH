window.addEventListener('load', function () {

  const form = document.querySelector('#signinForm')

  form.addEventListener('submit', function (event) {

    let errores = []

    const username = document.querySelector('#username')
    const password = document.querySelector('#password')

    if (username.value.trim() == "") {
      errores.push('El nombre de usuario es obligatorio')
    }

    if (password.value.trim() == "") {
      errores.push('El password es obligatorio')
    }

    if (errores.length > 0) {

      event.preventDefault()

      let errorsArea = document.querySelector('#errors-area')
      errorsArea.classList.remove('invisible')
      errorsArea.classList.add('errors-area')

      let ulErrores = document.querySelector('#errors-list')

      ulErrores.innerHTML = ''
      errores.forEach(error => {
        ulErrores.innerHTML += '<li>' + error + '</li>'
      })
    }

  })
})