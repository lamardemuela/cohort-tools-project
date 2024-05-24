//* Creamos ROUTER
const User = require("../models/User.model");
const router = require("express").Router();

// paquetes
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isTokenValid } = require("../middlewares/auth.middlewares");

//* Rutas de autenticacion
// POST "/api/auth/signup" => data del usuario
router.post("/signup", async (req, res, next) => {
  // destructuring req.body:
  const { email, name, password } = req.body;

  // validaciones del server
  // 1. campos required
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ errorMessage: "todos los campos son obligatorios" });
  }

  // 2. seguridad de la contraseña
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    return res
      .status(400)
      .json({
        errorMessage:
          "La contraseña no es suficientemente fuerte. Tiene que tener más de 8 caracteres, al menos una letra mayúscula, una minúscula y otro caracter",
      });
  }

  // 3. comprobamos que no hay otro email en l db
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res
        .status(400)
        .json({ errorMessage: "El email ya existe en nuestra base de datos" });
    }

    // encriptamos la contraseña
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    // cremos el documento en la db
    await User.create({
      email: email,
      password: hashPassword,
      name: name,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});
// POST "/api/auth/login" => recoger credenciales y enviar token
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  // validaciones
  // 1. comprobamos credenciales
  if (!email || !password) {
    return res
      .status(400)
      .json({ errorMessage: "todos los campos son obligatorios" });
  }

  // validaciones db
  try {
    // 2. el usuario existe en la db
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (!foundUser) {
      return res
        .status(400)
        .json({ errorMessage: "El usuario no existe en la base de datos" });
    }

    // 3. contraseña correcta
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    console.log(isPasswordCorrect);
    if (isPasswordCorrect === false) {
      return res.status(400).json({ errorMessage: "Contraseña incorrecta" });
    }

    // crear y enviar token
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
    };

    console.log(payload, "payload");
    // firma
    console.log(process.env);
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    console.log("authtoken", authToken);
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});
// GET "/api/auth/verify" => recibir y validar token
router.get("/verify", isTokenValid, (req, res, next) => {
  res.status(200).json({ payload: req.payload });
});

//* Exportamos ROUTER
module.exports = router;
