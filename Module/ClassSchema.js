
let mongoose = require('./connect.js')


const ClassSchema = new mongoose.Schema({

    Title: { type: String, required: [true, "Title is required"] },
    Contents: [],
    Task: { type: String },
}, {
    collection: 'class',
    versionKey: false
})

const ClassapiModel = mongoose.model('class', ClassSchema)


module.exports = ClassapiModel