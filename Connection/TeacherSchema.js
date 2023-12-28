let mongoose = require('./MogooseConnection')

teacherSchema = new mongoose.Schema(
    {
        "name": { type: String, required: [true, "name is requires"] },
        "students": []
    },
    {
        collection : "TeacherDB",
        versionKey: false
    }
)

const teacherDB = mongoose.model('TeacherDB', teacherSchema);

module.exports = teacherDB