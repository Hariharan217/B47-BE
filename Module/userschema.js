let mongoose = require('../Module/connect')

const userschema = new mongoose.Schema({
    "name": { type: String, required: [true, "Name is required"] },
    "userid": { type: String, required: [true, "UserID is required"] },
    "password": { type: String, required: [true, "Password is required"] }
}, {
    collection: "UsersAPI",
    versionKey: false
})

const Usersapimodel = mongoose.model('UsersAPI', userschema)

module.exports = Usersapimodel;