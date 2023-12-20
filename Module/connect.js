let mongoose = require('mongoose')

try {
    mongoose.connect('mongodb+srv://harikalai217:Hari217@cluster0.zobfzob.mongodb.net/Mydatabase')
} catch (error) {
    console.log(error)

}

module.exports = mongoose;