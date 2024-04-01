
const addCors = (req, res, next) => {
  console.log('Agregando CORS');
  // Agregamos una cabcera para permitir el acceso a recursos en otros dominios (desde el dash-react a la api)
  res.header('Access-Control-Allow-Origin', '*')
  next();
}

module.exports = addCors;