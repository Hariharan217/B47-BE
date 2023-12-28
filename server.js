let express = require('express')
let studentdata = require('./Routes/StudentRoute')
let teacherdata = require('./Routes/TeacherRoute')

let app = express()

let cors = require('cors')

app.use(express.json())
app.use(cors())

app.use('/student', studentdata)
app.use('/teacher', teacherdata)


app.listen(2000)