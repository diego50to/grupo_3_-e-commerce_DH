const express = require("express");
const router = express.Router();
const usersAPIController = require("../../controllers/api/usersAPIController");

//Rutas
//Listado de todos los users
router.get("/", usersAPIController.list);

//Detalle del user
router.get("/:id", usersAPIController.detail);

// Obtener un usuario por su email
router.get("/:email/getbyemail", usersAPIController.getUserByEmail);

// Obtener un usuario por su username
router.get("/:username/getbyusername", usersAPIController.getUserByUsername);


module.exports = router;
