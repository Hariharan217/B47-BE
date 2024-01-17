const { Schema, now } = require('mongoose')
let mongoose = require('./connect.js')

const ClassSchema = new mongoose.Schema({

    Title: { type: String, required: [true, "Title is required"] },
    Date : { type: Date, required: [true, "Title is required"] },
    Contents: [],
    Task: { type: Number, default: 0 },
}, {
    collection: 'class',
    versionKey: false
})

const ClassapiModel = mongoose.model('class', ClassSchema)

module.exports = ClassapiModel