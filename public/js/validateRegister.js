window.addEventListener('load', function () {
  
  const form = document.querySelector('#registerForm')
  
  form.addEventListener('submit', async function (event) {
    event.preventDefault()
    let errores = []

    const nombre = document.querySelector('#nombre')
    const username = document.querySelector('#username')
    const email = document.querySelector('#email')
    const password = document.querySelector('#password')
    const image = document.querySelector('#image')

    if (nombre.value.trim() == "") {
      errores.push('El nombre es obligatorio')
    } else if (nombre.value.trim().length < 2) {
      errores.push('El nombre debe ser de al menos 2 caractres')
    }

    if (username.value.trim() == "") {
      errores.push('El nombre de usuario es obligatorio')
    } else if (username.value.trim().length < 3) {
      errores.push('El nombre debe ser de al menos 3 caractres')
    } else if (username.value.trim()) {
      // Comprobamos que el nombre de usuario no este registrado ya
      let response = await fetch(`http://localhost:3000/api/users/${username.value.trim()}/getbyusername/`, {
        method: 'GET'
      })
      response = await response.json()

      if (response.cantidad > 0) {
        errores.push('Este nombre de usuario ya fue registrado')
      }      
    }

    if (email.value.trim() == "") {
      errores.push('El email es obligatorio')
    } else if (!validarEmail(email.value.trim())) {
      errores.push('El email no es valido')
    } else {

      // Comprobamos que el email no este registrado ya
      let data = await fetch(`http://localhost:3000/api/users/${email.value.trim()}/getbyemail/`, {
        method: 'GET'
      })
      data = await data.json()

      if (data.meta.count > 0) {
        errores.push('Este email ya fue registrado')
      }
    }

    const expRegPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])/
    if (password.value.trim() == '') {
      errores.push('La contraseña es obligatoria')
    } else if (password.value.trim().length < 8) {
      errores.push('La contraseña debe ser de al menos 8 caracteres')
    } else if (!expRegPass.test(password.value.trim())) {
      errores.push('La contraseña debe incluir letras mayúsculas, minúsculas, un número y un carácter especial.')
    }

    if (image.value.trim() == '') {
      errores.push('La imagen del usuario es obligatoria')
    } else {
      const extPermitidas = /(.jpeg|.jpg|.png|.gif)$/i;
      const pruebaExtension = extPermitidas.test(image.value.trim())

      if (!pruebaExtension) {
        errores.push('El formato de archivo de imagen no es valido ')
      }
    }
    
    if (errores.length > 0) {

      let errorsArea = document.querySelector('#errors-area')
      errorsArea.classList.remove('invisible')
      errorsArea.classList.add('errors-area')

      let ulErrores = document.querySelector('#errors-list')

      ulErrores.innerHTML = ''
      errores.forEach(error => {
        ulErrores.innerHTML += '<li>' + error + '</li>'
      })
    } else {
      this.submit()
    }

  })
})