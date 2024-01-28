const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

try {
   mongoose.connect(`${process.env.MONGODB_URL}`)
} catch (error) {
    console.log(error)
}

module.exports = mongoose;