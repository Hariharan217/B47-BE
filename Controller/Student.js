
const ClassapiModel = require('../Module/ClassSchema')
let StudentsapiModel = require('../Module/StudentSchema')
const nodemailer = require("nodemailer");
var randomstring = require("randomstring");
const jwt = require('jsonwebtoken')

const login = async (req, res) => {

    try {

        let studentuser = req.body

        let finding = await StudentsapiModel.findOne({ userid: studentuser.userid })

        if (finding) {
            if (finding.password == studentuser.password) {

                const token = await jwt.sign({ userid: finding.userid }, "APPLE")
                res.send(token);
            }
        }
    }
    catch (error) {
        res.send(error)
    }
}

const createstudentdetail = async (req, res) => {

    try {
        await StudentsapiModel.create(req.body)
        res.status(200).send("students created successfuly")

    } catch (error) {
        console.log(error)
    }
}

const assignclass = async (req, res) => {

    let token = req.headers.authorization.split(' ')

    const detoken = await jwt.verify(token[1], "APPLE")

    let studentName = await StudentsapiModel.findOne({ userid: detoken.userid })

    studentName.class.push(...req.body)

    studentName.save()
    res.status(200).send("teacher assigned successfully")

}
const studentClassdetail = async (req, res) => {

    let token = req.headers.authorization.split(' ')

    try {
        if (token[1]) {
            let detoken = await jwt.verify(token[1], "APPLE")
            let studentClassdetail = await StudentsapiModel.findOne({ userid: detoken.userid })
            res.send(studentClassdetail)

        }

    } catch (error) {
        console.log(error)
    }
}

let codecadak = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')
        const detoken = await jwt.verify(token[1], "APPLE")
        if (token[1]) {
            let codecadak = await StudentsapiModel.findOne({ userid: detoken.userid })
            console.log(codecadak.webcode)

        }

    } catch (error) {
        console.log(error)

    }
}

const forgetpassword = async (req, res) => {

    let student = await StudentsapiModel.findOne({ userid: req.body.email })
    console.log(student)
    let resettoken = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
    });

    student.resetToken = resettoken
    student.save()

    console.log(resettoken)

    let link = `http://localhost:5173/passwordreset/${resettoken}`


    ////////////////////////////////////////////////////////mail code
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: "hari@gmail.com",
            pass: "12345",
        },
    });

    const info = await transporter.sendMail({
        from: "hari", // sender address
        to: req.body.email, // list of receivers
        subject: "password reset link", // Subject line
        text: "Hello world?", // plain text body
        html: link, // html body
    });

    console.log(info)
}




module.exports = { login, createstudentdetail, assignclass, studentClassdetail, codecadak, forgetpassword }