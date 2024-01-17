let mongoose = require('mongoose')

let dotenv = require('dotenv')

dotenv.config()

try {
    mongoose.connect(process.env.MONGODB_URL)
} catch (error) {
    console.log(error)
    console.log("server connected")
}


module.exports = mongoose;