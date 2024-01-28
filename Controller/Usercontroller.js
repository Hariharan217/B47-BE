

let ResetPasswordsapiModel = require('../Module/Userschema')
const nodemailer = require("nodemailer");
var randomstring = require("randomstring");
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")

dotenv.config()

const createstudentdetail = async (req, res) => {

    console.log(req.body)

    let { userid, password } = req.body
    // console.log(userid, password)

   
    try {

        let finding = await ResetPasswordsapiModel.findOne({ userid: userid })

        if (finding) {
            res.send("username already exist")
        }
        else {
            await ResetPasswordsapiModel.create(req.body)
            res.status(200).send("Registration successfuly")
        }

    } catch (error) {
        console.log(error)
    }
}



const login = async (req, res) => {

    try {

        let studentuser = req.body


        let finding = await ResetPasswordsapiModel.findOne({ userid: studentuser.userid })

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



const forgetpassword = async (req, res) => {

    let student = await ResetPasswordsapiModel.findOne({ userid: req.body.email })
    // console.log(student) 
    let resettoken = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
    });

    student.resetToken = resettoken
    student.save()

    // console.log(resettoken)

    let link = `${process.env.FE_URL}/passwordreset/${resettoken}`


    ////////////////////////////////////////////////////////mail code
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: "hari", // sender address
        to: req.body.email, // list of receivers
        subject: "password reset link", // Subject line
        text: "Hello world?", // plain text body
        html: link, // html body
    });

    // console.log(info)
    res.send("password reset link send your mail please check it")
}

const passwordchange = async (req, res)=>{

    console.log(req.body)

    let {token, newpassword} = req.body

    try {

        let finding = await ResetPasswordsapiModel.findOne({resetToken: token})
        console.log(finding.resetToken)

        finding.password = newpassword
        finding.save()
        res.send("password reset successfully")
        
    } catch (error) {

        console.log(error)
        
    }

}




module.exports = { login, forgetpassword , passwordchange, createstudentdetail}