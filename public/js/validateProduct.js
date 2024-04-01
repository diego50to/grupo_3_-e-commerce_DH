window.addEventListener('load', function () {
  const form = document.querySelector('#productForm')
  form.addEventListener('submit', function (event) {

    event.preventDefault()

    let errores = []

    const name = document.querySelector('#name')
    const description = document.querySelector('#description')
    const image = document.querySelector('#image')

    if (name.value.trim() == "") {
      errores.push('El nombre es obligatorio')
    } else if (name.value.trim().length < 5) {
      errores.push('El nombre debe ser de al menos 5 caractres')
    }

    if (description.value.trim() == "") {
      errores.push('La descripcion es obligatoria')
    } else if (name.value.trim().length < 5) {
      errores.push('La descripcion debe ser de al menos 20 caractres')
    }

    if (image.value == '') {
      errores.push('La imagen del producto es obligatoria')
    } else {
      const extPermitidas = /(.jpeg|.jpg|.png|.gif)$/i;
      const pruebaExtension = extPermitidas.test(image.value.trim())

      if (!pruebaExtension) {
        errores.push('El formato de archivo de imagen no es valido ')
      }
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