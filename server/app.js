const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const mongoose = require("mongoose")

const PORT = 5005;
const cohortData = require(__dirname + "/cohorts.json") //se puede usar sin dirname.
const studentsData = require(__dirname + "/students.json")
const CohortSchema = require("./models/Cohorts.model.js")
const StudentSchema = require("./models/Students.model.js")

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:

app.use(cors({
  origin: ['http://localhost:5173']
})) //deja entrar lo que especifiquemos
//app.use(cors({origin:'*'})) //deja entrar a cualquiera

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:

//* RUTAS CONECTADAS CON JSON
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
app.get("/api/cohorts", (req, res)=>{
  res.json(cohortData)
})
app.get("/api/students", (req, res)=>{
  res.json(studentsData)
})

//* RUTAS CONECTADAS CON MONGOOSE/MONGODB
app.get("/cohorts", (req, res) => {
  CohortSchema.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving books ->", error);
      res.status(500).json({ error: "Failed to retrieve books" });
    });
});
app.get("/students", (req, res) => {
  StudentSchema.find({})
    .then((students) => {
      console.log("Retrieved cohorts ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving books ->", error);
      res.status(500).json({ error: "Failed to retrieve books" });
    });
});



//* START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});