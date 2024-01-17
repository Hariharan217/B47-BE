

let express = require('express');
let cors =require('cors')
let app = express();
app.use(express.json())
app.use(cors())


let studentroute = require('./Routes/StudentRoutes')

let classroute = require('./Routes/ClassRoutes')

app.use('/student', studentroute)

app.use('/class', classroute)

app.listen(5001);