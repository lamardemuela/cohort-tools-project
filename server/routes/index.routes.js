//* Creamos ROUTER
const router = require("express").Router();
const studentRouter = require("./student.routes.js")
router.use("/students", studentRouter)


const cohortRouter = require("./cohort.routes.js")
router.use("/cohorts", cohortRouter)

// ruta de autenticacion
const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)

//ruta del usuario
const userRouter = require ("./users.routes.js")
router.use("/users", userRouter)

//* Exportamos ROUTER
module.exports = router;