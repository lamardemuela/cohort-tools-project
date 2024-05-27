require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")

// MIDDLEWARE
function config(app) {    
    app.use(cors({ 
      origin: ["http://localhost:5173"]}))
     /* app.use(cors({origin:'*'})) */ //deja entrar a cualquiera
    //deja entrar lo que especifiquemos
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}

module.exports = config