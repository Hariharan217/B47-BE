const { Schema } = require('mongoose')
let mongoose = require('./connect.js')

const StudentsSchema = new mongoose.Schema({

    userid: { type: String, required: [true, "userid is required"] },
    password: { type: String, required: [true, "password is required"] },
    webcode: { type: Number, default: 0 },
    codecodak: { type: Number, default: 0 },
    resetToken: {type: String, default: ""},
    class: [{
        classid: { type: Schema.Types.ObjectId },
        ispresent: { type: Boolean },
        Taskcompletion: { type: Boolean},
        Taskmark: { type: Number },
        Taskcomments: { type: String},
        Leaveapplication: { type: Boolean },

    }],

}, {
    collection: 'Students',
    versionKey: false
})

const StudentsapiModel = mongoose.model('Students', StudentsSchema)

module.exports = StudentsapiModel