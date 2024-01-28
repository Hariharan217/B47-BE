let express = require('express');
let router = express.Router();

let userObject = require('../Controller/Usercontroller')

router.put('/login', userObject.login)

router.post('/forgetpassword', userObject.forgetpassword)

router.put('/passwordchange', userObject.passwordchange)

router.post('/', userObject.createstudentdetail)


module.exports = router