//* Creamos ROUTER
const router = require("express").Router();
const studentRouter = require("./student.routes.js")
router.use("/students", studentRouter)
const cohortRouter = require("./cohort.routes.js")
router.use("/cohorts", cohortRouter)

//* Exportamos ROUTER
module.exports = router;