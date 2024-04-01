const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const cors = require("cors");

const mainRouter = require("./routes/main");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const adminRouter = require("./routes/adminRouter");

const apiUsersRouter = require("./routes/api/users");
const apiProductsRouter = require("./routes/api/products");

const addCors =require("./middlewares/addCors")

const usernameInCookie = require("./middlewares/usernameInCookie");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(addCors)
app.use(cors({ origin: "http://localhost:5173" }));

// Middleware de session
app.use(
  session({
    secret: "123456",
    resave: false,
    saveUninitialized: false,
  })
);

// Añadir la funcionalidad de mensajes flash
app.use(flash());

app.use((req, res, next) => {
  res.locals.mensajes = req.flash(); // Los mensajes flash pasan a estar disponibles para toda la aplicacion
  next();
});

// Determinar si se recordo al usuario al momento de loguear
app.use(usernameInCookie);

// Para sabe en las templates si hay un usuario logueado
app.use(userLoggedMiddleware);

// Template engine
app.set("view engine", "ejs");

// Rutas
app.use("/", mainRouter);
app.use("/admin/", adminRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

//Rutas API
//Colección de mis Usuarios (APIs)
app.use("/api/users", apiUsersRouter);
//Colección de mis Productos (APIs)
app.use("/api/products", apiProductsRouter);

app.listen(3000, () => console.log("Servidor funcionando"));

// app.get("/signup", (req, res) => {
//   res.render("users/signup");
// });

// app.get("/signout", (req, res) => {
//   res.render("home");
// });

/* app.get("/productDetail", (req, res) => {
  res.render("products/productDetail");
}); */

app.get("/productCart", (req, res) => {
  res.render("products/productCart");
});

app.get("/productForm", (req, res) => {
  res.render("products/productForm");
});
