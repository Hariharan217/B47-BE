
let mongoose = require('./MogooseConnection')
let studentSchema = new mongoose.Schema(
    {
        "name":{ type:String, required:[true, "student name is required"] },
        "teacher": {type : String, default : "" }
    },
    {
        collection : "StudentDB",
        versionKey : false
    }
)

const studentDB = mongoose.model('StudentDB', studentSchema);

module.exports = studentDB