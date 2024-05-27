const User = require("../models/User.model");
const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares");

//Rutas
router.get("/:id", isTokenValid, async (req, res, next) => {
  try {
  
    const response = await User.findById(req.params.id);
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
