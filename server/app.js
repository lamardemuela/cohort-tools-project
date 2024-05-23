const express = require("express");
const PORT = 5005;
const app = express();

//* CONEXION MONGOOSE (DB)
require("./db")

//* CONEXION MIDDLEWARES
const config = require("./config")
config(app)

//* RUTAS CONECTADAS CON JSON
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//* RUTAS CONECTADAS CON MONGOOSE/MONGODB
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

//** GESTOR DE ERRORES **
const errorHandling = require("./error-handling")
errorHandling(app)

//* START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});