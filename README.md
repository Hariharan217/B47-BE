

app.use('/student', studentroute)

app.use('/class', classroute)

"ClassRoutes"

router.post('/', classObject.creatclass)

router.get('/getclass', classObject.getclass)

router.post('/getoneclass', classObject.getoneclass)

router.post('/leaveapply', classObject.leaveapply)

router.post('/tasksubmission', classObject.tasksubmission)

"StudentRoutes"

router.put('/login', studentObject.login)

router.post('/', studentObject.createstudentdetail)

router.get('/assignclass', studentObject.assignclass)

router.get('/studentClassdetail', studentObject.studentClassdetail)

router.get('/codecadak', studentObject.codecadak)

router.post('/forgetpassword', studentObject.forgetpassword)