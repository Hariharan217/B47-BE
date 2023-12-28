let studentDB = require('../Connection/StudentSchema')
let teacherDB = require('../Connection/TeacherSchema')

let getallinformation = async (req, res) => {

    try {

        let teacher = await teacherDB.find()
        res.status(200).send(teacher)

    } catch (error) {
        res.send(error)
    }
}

let createteacher = async (req, res) => {
    try {

        await teacherDB.create(req.body)
        res.status(200).send("teacher created successfuly")

    } catch (error) {
        res.send(error)

    }
}
const addstudents = async (req, res) => {

    let { id } = req.params
    let { student } = req.body
    let teacher = await teacherDB.findById(id)
    // console.log(teacher)
    teacher.students.push(student);

    let students = await studentDB.findOne({ _id: student })
    students.teacher = teacher._id
    // console.log(students)
    teacher.save()
    students.save()
}

const deleteteacher = async (req, res) => {

    let { id } = req.params

    let teacher = await teacherDB.findById(id)

    await studentDB.updateMany({ "teacher": id }, { "teacher": "" })
    await teacherDB.deleteOne({ _id: id });


    

}

module.exports = { getallinformation, createteacher, addstudents, deleteteacher }