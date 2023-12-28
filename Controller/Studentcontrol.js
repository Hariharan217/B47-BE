let studentDB = require('../Connection/StudentSchema')
let teacherDB = require('../Connection/TeacherSchema')

const getallinformation = async (req, res) => {
    try {
        let student = await studentDB.find()
        res.status(200).send(student)

    } catch (error) {
        res.send(error)
    }

}

const createstudent = async (req, res) => {
    try {
        await studentDB.create(req.body)
        res.status(200).send("student created successfuly")

    } catch (error) {
        res.send(error)
    }
}

const studentwithoutTeacher = async (req, res) => {
    let studentname = await studentDB.find({ "teacher": "" })
    console.log(studentname)
}

const assignteacher = async (req, res) => {
    let { id } = req.params;
    let studentName = await studentDB.findOne({ _id: id })
    //    console.log(studentName._id)
    let finding = req.body
    studentName.teacher = finding.teacher
    studentName.save()

    let teachertostudent = await teacherDB.findOne({ _id: req.body.teacher })
    //    console.log(teachertostudent.students)
    teachertostudent.students.push(studentName._id)
    teachertostudent.save()
    res.status(200).send("teacher assigned successfully")

}

const deletestudent = async (req, res) => {

    let { id } = req.params

    let deleted = await studentDB.findOne({_id: id})
    
    let teacher = await teacherDB.findById(deleted.teacher)
    // console.log(teacher.students)
    let index= teacher.students.indexOf(id)
    teacher.students.splice(index, 1)
    teacher.save()

     await studentDB.deleteOne({_id: id})

}


module.exports = { getallinformation, createstudent, studentwithoutTeacher, assignteacher, deletestudent }