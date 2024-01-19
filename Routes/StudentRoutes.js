let express = require('express');
let router = express.Router();

let studentObject = require('../Controller/Student')

router.put('/login', studentObject.login)

router.post('/', studentObject.createstudentdetail)

router.get('/assignclass', studentObject.assignclass)

router.get('/studentClassdetail', studentObject.studentClassdetail)

router.get('/codecadak', studentObject.codecadak)

router.post('/forgetpassword', studentObject.forgetpassword)

router.put('/passwordchange', studentObject.passwordchange)






module.exports = router