const express = require('express');
const userRouter = require('./Routes/UserRoutes')
const urlRouter = require('./Routes/UrlRoutes')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())


app.use('/users', userRouter)
app.use('/url', urlRouter)


app.listen(3001)