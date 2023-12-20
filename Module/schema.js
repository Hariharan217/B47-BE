let mongoose = require('./connect.js')

const roomSchema = new mongoose.Schema({

    name: { type: String, required: [true, "First Name is required"] },
    type: { type: String, required: [true, "type is required"] },
    Rent: { type: Number, required: [true, "rent is required"] },
    BookingHistory: [],
    furniture: { type: String, required: [true, "furniture is required"] },
}, {
    collection: 'RoomsAPI',
    versionKey: false
})

const roomsapimodel = mongoose.model('RoomsAPI', roomSchema)

module.exports = roomsapimodel