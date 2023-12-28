let express = require('express');
const route = express.Router();
let teacherControl = require('../Controller/Teachercontrol')

route.get('/', teacherControl.getallinformation)

route.post('/', teacherControl.createteacher)

route.put('/addstudent/:id', teacherControl.addstudents)

route.delete('/delete/:id', teacherControl.deleteteacher)

module.exports = route