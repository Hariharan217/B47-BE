
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
                res.send({ token: token });
            } else {
                res.send("incorrect password")
            }
        } else {
            res.send("user doesn't exist")
        }
    }
    catch (error) {
        res.send(error)
    }
}

const createstudentdetail = async (req, res) => {

    // console.log(req.body)

    let { userid, password } = req.body
    // console.log(userid, password)

    let classArray = [{
        classid: "65aa537516998018f5e7e2a4",
        ispresent: false,
        Taskcompletion: false,
        Taskmark: "",
        Taskcomments: "",
        Leaveapplication: false
    },

    {
        classid: "65aa53d116998018f5e7e2a6",
        ispresent: false,
        Taskcompletion: false,
        Taskmark: "",
        Taskcomments: "",
        Leaveapplication: false
    },

    {
        classid: "65aa540f16998018f5e7e2a8",
        ispresent: false,
        Taskcompletion: false,
        Taskmark: "",
        Taskcomments: "",
        Leaveapplication: false
    },
    {
        classid: "65aa545e16998018f5e7e2aa",
        ispresent: false,
        Taskcompletion: false,
        Taskmark: "",
        Taskcomments: "",
        Leaveapplication: false
    },
    {
        classid: "65aa54b516998018f5e7e2ac",
        ispresent: false,
        Taskcompletion: false,
        Taskmark: "",
        Taskcomments: "",
        Leaveapplication: false
    },
    {
        classid: "65aa552816998018f5e7e2ae",
        ispresent: false,
        Taskcompletion: false,
        Taskmark: "",
        Taskcomments: "",
        Leaveapplication: false
    }]

    let classobject = { userid, password, class: classArray }


    try {

        let finding = await StudentsapiModel.findOne({ userid: userid })

        if (finding) {
            res.send("username already exist")
        }
        else {
            await StudentsapiModel.create(classobject)
            res.status(200).send("Registration successfuly")
        }

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