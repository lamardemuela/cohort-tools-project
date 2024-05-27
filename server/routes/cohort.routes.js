//* Creamos ROUTER
const router = require("express").Router();
const CohortSchema = require("../models/Cohorts.model.js")

  router.get("/", (req, res,next) => {
    CohortSchema.find({})
      .then((cohorts) => {
        res.status(200).json(cohorts);
      })
      .catch((error) => {
        next(error)
      });
  });
  router.post("/", (req,res,next)=>{
    CohortSchema.create({
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours
    })
    .then(()=>{
      res.sendStatus(201)
    })
    .catch((e)=>{
      next(e)
    })
  })
  router.get("/:cohortId",async (req,res,next)=>{
  try {
    const respuesta = await CohortSchema.findById(req.params.cohortId)
    res.status(200).json(respuesta)
  } catch (error) {
    next(error)
  }
  })
  router.put("/:cohortId", async (req,res,next)=>{
    try {
      await CohortSchema.findByIdAndUpdate(req.params.cohortId, {
        inProgress: req.body.inProgress,
        cohortSlug: req.body.cohortSlug,
        cohortName: req.body.cohortName,
        program: req.body.program,
        campus: req.body.campus,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        programManager: req.body.programManager,
        leadTeacher: req.body.leadTeacher,
        totalHours: req.body.totalHours
      })
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  })
  router.delete("/:cohortId", async (req,res,next)=>{
    try {
      await CohortSchema.findByIdAndDelete(req.params.cohortId)
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  })
    //* Exportamos ROUTER
module.exports = router;