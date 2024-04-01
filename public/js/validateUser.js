window.addEventListener('load', function () {
  
  const form = document.querySelector('#userForm')
  
  form.addEventListener('submit', function (event) {

    let errores = []

    const name = document.querySelector('#name')
    const email = document.querySelector('#email')
    const image = document.querySelector('#image')

    if (name.value.trim() == "") {
      errores.push('El nombre es obligatorio')
    } else if (name.value.trim().length < 2) {
      errores.push('El nombre debe ser de al menos 2 caractres')
    }

    if (email.value.trim() == "") {
      errores.push('El email es obligatorio')
    } else if (!validarEmail(email.value.trim())) {
      errores.push('El email no es valido')
    }

    if (image.value.trim() == '') {
      errores.push('La imagen del usuario es obligatoria')
    }

    if (errores.length > 0) {

      event.preventDefault()

      let errorsArea = document.querySelector('#errors-area')
      errorsArea.classList.remove('invisible')
      errorsArea.classList.add('alert', 'alert-danger')

      let ulErrores = document.querySelector('#errors-list')

      ulErrores.innerHTML = ''
      errores.forEach(error => {
        ulErrores.innerHTML += '<li>' + error + '</li>'
      })
    }

  })
})