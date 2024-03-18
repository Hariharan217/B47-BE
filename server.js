
let express = require('express')
const nodemailer = require("nodemailer")
let cors =require('cors')

let app = express();

app.use(express.json())

app.use(cors())


app.post('/', async (req, res)=>{

    let {name,mail,mobile,mailsubject,message} = req.body
       
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
    
        var mailOptions = {
            from: mail,
            to: process.env.EMAIL,
            subject: `${mailsubject} - from RESUME`,
            text: `
            Name : ${name},
            mobile : ${mobile}
            Message : ${message}`
        };
    
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                res.send('Error: ', error)
            }
            else {
                res.status(200).send("Email sent") ;
            };
        });
    }
  

)


app.listen(5001);