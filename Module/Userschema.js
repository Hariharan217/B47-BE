
let mongoose = require('./connect')

const PasswordSchema = new mongoose.Schema({
    
    userid: { type: String, required: [true, "userid is required"] },
    password: { type: String, required: [true, "password is required"] },
    resetToken : { type: String }
    
}, {
    collection: 'ResetPassword',
    versionKey: false
})

const ResetPasswordsapiModel = mongoose.model('ResetPassword', PasswordSchema)

module.exports = ResetPasswordsapiModel