const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const PORT = 5005;
const cohortData = require(__dirname + "/cohorts.json") //se puede usar sin dirname.
const studentsData = require(__dirname + "/students.json")

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

//app.use(cors()) //deja entrar a cualquiera

app.use(cors({
  origin: ['http://localhost:5173']
})) //deja entrar lo que especifiquemos

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
app.get("/api/cohorts", (req, res)=>{
  res.json(cohortData)

})
app.get("/api/students", (req, res)=>{
  res.json(studentsData)
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});