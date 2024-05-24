require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")

// MIDDLEWARE
function config(app) {    
    app.use(cors({
      origin: [process.env.ORIGIN]
    })) //deja entrar lo que especifiquemos
    //app.use(cors({origin:'*'})) //deja entrar a cualquiera
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}

module.exports = config