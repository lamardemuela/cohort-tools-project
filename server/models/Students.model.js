const mongoose = require("mongoose")
const Cohort = require("./Cohorts.model")
const Schema = mongoose.Schema
const studentSchema = new Schema(
    {
        firstName:String,
        lastName:String,
        email:String,
        phone:String,
        linkedinUrl:String,
        languages:Array,
        program:String,
        background:String,
        cohort:Schema.Types.ObjectId,
        projects:Array
})
const Student = mongoose.model("Student",studentSchema)

module.exports = Student