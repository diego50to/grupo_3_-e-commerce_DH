const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

const usersAPIController = {
  list: (req, res) => {
    db.User.findAll({
      include: [
        {
          association: "person",
        },
      ],
    }).then((users) => {
      let respuesta = {
        meta: {
          status: 200,
          count: users.length,
          url: "api/users",
        },
        users: users.map((user) => ({
          id: user.id,
          name: user.person.name,
          email: user.person.email,
          detail: `api/users/${user.id}`, // Aquí se genera la URL para el detalle del usuario
        })),
      };
      res.json(respuesta);
    });
  },

  detail: (req, res) => {
    console.log(req.params);
    db.User.findByPk(req.params.id, {
      include: [
        {
          association: "person",
        },
      ],
    }).then((user) => {
      let respuesta = {
        meta: {
          status: 200,
          count: user.length,
          url: "/api/users/:id",
        },
        data: {
          id: user.id,
          name: user.person.name,
          email: user.person.email,
          image: user.person.image,
          phonenumber: user.person.phonenumber,
          address: user.person.address,
          zipcode: user.person.zipcode,
        },
      };
      res.json(respuesta);
    });
  },

  getUserByEmail: (req, res) => {

    db.Person.findAll({
      where: {
        email: req.params.email
      }
    }).then( (personas) => {      
      let respuesta = {
        meta: {
          status: 200,
          count: personas.length,
          url: "/api/users/:email/getbyemail",
        }
      }
      
      res.json(respuesta);
    });    
  },

  getUserByUsername: (req, res) => {

    db.User.findAll({
      where: {
        username: req.params.username
      }
    }).then((users) => {
      const respuesta = {
        cantidad: users.length
      }      
      res.json(respuesta);
    });
  }  
};

module.exports = usersAPIController;
