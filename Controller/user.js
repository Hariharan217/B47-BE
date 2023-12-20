
const roomsapimodel = require('../Module/schema')
const usersapimodel = require('../Module/userschema')
const checkingdate = require('../Daysendpoint/daybooking')

// console.log(checkingdate);


let getallinformation = async (req, res) => {
    try {
        let rooms = await roomsapimodel.find()
        res.status(200).send(rooms)

    } catch (error) {
        console.log("error")
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




module.exports = { getallinformation, createrooms, updaterooms, deleteroom }