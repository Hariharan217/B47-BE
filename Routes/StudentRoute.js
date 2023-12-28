let express = require('express');
const router = express.Router();
const controlerobject = require('../Controller/Studentcontrol');



router.get('/', controlerobject.getallinformation)

router.post('/addstudent', controlerobject.createstudent)

router.get('/swt', controlerobject.studentwithoutTeacher)

router.put('/assignteacher/:id', controlerobject.assignteacher)

router.delete('/delete/:id', controlerobject.deletestudent)




module.exports = router