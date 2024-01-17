let express = require('express');
let router = express.Router();

let classObject = require('../Controller/Class')

router.post('/', classObject.creatclass)

router.get('/getclass', classObject.getclass)

router.post('/getoneclass', classObject.getoneclass)

router.post('/leaveapply', classObject.leaveapply)

router.post('/tasksubmission', classObject.tasksubmission)





module.exports = router