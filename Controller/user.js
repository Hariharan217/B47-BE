
const roomsapimodel = require('../Module/schema')
const usersapimodel = require('../Module/userschema')
const checkingdate = require('../Daysendpoint/daybooking')
const jwt = require('jsonwebtoken')

// console.log(checkingdate);


let getallinformation = async (req, res) => {
    try {
        let btoken = req.headers.authorization
        console.log(btoken)
    
        if(btoken){
        
        let token = btoken.split(' ')
       
        let detoken = await jwt.verify(token[1], "APPLE")
        //    console.log(detoken)
        let checkingtoken = await usersapimodel.findOne({ userid: detoken.userid })
        //    console.log(checkingtoken);

        if (checkingtoken) {
            let rooms = await roomsapimodel.find()
            res.status(200).send(rooms)
        }
        }else{
            res.send("token unavailable")
        }}

    catch (error) {
                console.log(error)
            }
    
    }

let createrooms = async (req, res) => {
    try {
        await roomsapimodel.create(req.body)
        res.status(200).send("room created successfuly")

    } catch (error) {
        console.log(error)
    }
}

let updaterooms = async (req, res) => {

    try {


    } catch (error) {
        res.send({ message: "error" })
    }
    try {
        let { id } = req.params
        let object = await roomsapimodel.findOne({ _id: id })
        if (req.body.userid && req.body.startdate && req.body.enddate) {
            let finding = await usersapimodel.findOne({ userid: req.body.userid })
            if (finding != null) {

                if (checkingdate(object.BookingHistory, req.body) == true) {

                    object.BookingHistory.push(req.body)
                    await roomsapimodel.findByIdAndUpdate(id, object)
                    res.status(200).send("room updated successfuly")
                }
                else {
                    res.send("room already booked")
                }
            }
            else {
                res.send("userid not exit")
            }
        } else {
            res.send("need userid and date")
        }



    } catch (error) {
        console.log(error)
    }
}
let deleteroom = async (req, res) => {

    try {
        let { id } = req.params;
        await roomsapimodel.deleteOne({ _id: id })
        res.status(200).send("room deleted successfuly")

    } catch (error) {
        console.log(error)
    }
}

const signup = async (req, res) => {

    try {


        let user = req.body
        let finding = await usersapimodel.findOne({ userid: user.username })


        if (finding) {
            if (finding.password == user.password) {

                const token = await jwt.sign({ userid: finding.userid }, "APPLE")

                res.status(200).send(token);
            }
            else (
                console.log("incorrect password")
            )
        }

    } catch (error) {

        console.log(error)

    }



}



module.exports = { getallinformation, createrooms, updaterooms, deleteroom, signup }