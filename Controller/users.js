
const usersapimodel = require('../Module/userschema')

let getallinformation = async (req, res) => {
    try {
        let rooms = await usersapimodel.find()
        console.log(usersapimodel)
        res.status(200).send(rooms)

    } catch (error) {
        console.log(error)
    }
}

let createusers = async (req, res) => {
    try {
        let finding = await usersapimodel.findOne({ userid: req.body.userid })
        if (finding == null) {
            await usersapimodel.create(req.body)
            res.status(200).send("users created successfuly")
        }
        else{
            res.send("users already exist")
        }

        

    } catch (error) {
        console.log(error)
    }
}

module.exports = { getallinformation, createusers }