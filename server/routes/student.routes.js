
//* Creamos ROUTER
const router = require("express").Router();
const StudentSchema = require("../models/Students.model.js")

router.get("/", (req, res,next) => {
    StudentSchema.find({})
      .populate("cohort")
      .then((students) => {
        //console.log("Retrieved cohorts ->", students);
        res.status(200).json(students);
      })
      .catch((error) => {
        next(error)
      });
  });
  router.post("/", (req,res,next)=>{
    StudentSchema.create({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      phone:req.body.email,
      linkedinUrl:req.body.linkedinUrl,
      languages:req.body.languages,
      program:req.body.program,
      background:req.body.background,
      cohort:req.body.cohort,
      projects:req.body.projects
    })
    .then(()=>{
      res.sendStatus(201)
    })
    .catch((e)=>{
      next(e)
    })
  })
  router.get("/:studentId",async (req,res,next)=>{
  try {
    const respuesta = await StudentSchema.findById(req.params.studentId)
    .populate("cohort")
    res.status(200).json(respuesta)
  } catch (error) {
    next(error)
  }
  })
  router.get("/cohort/:cohortId",async (req,res,next)=>{
    try {
      const respuesta = await StudentSchema.find({cohort:req.params.cohortId})
      .populate("cohort")
      res.status(200).json(respuesta)
    } catch (error) {
      next(error)
    }
  })
  router.put("/:studentId", async (req,res,next)=>{
    try {
      await StudentSchema.findByIdAndUpdate(req.params.studentId, {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phone:req.body.email,
        linkedinUrl:req.body.linkedinUrl,
        languages:req.body.languages,
        program:req.body.program,
        background:req.body.background,
        cohort:req.body.cohort,
        projects:req.body.projects
      })
      res.sendStatus(201)
    } catch (error) {
      next(error)
    }
  })
  router.delete("/:studentId", async (req,res,next)=>{
    try {
      await StudentSchema.findByIdAndDelete(req.params.studentId)
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  })
  //* Exportamos ROUTER
module.exports = router;