

let express = require('express');
let cors =require('cors')
let app = express();
app.use(express.json())
app.use(cors())


let userRoute = require('./Routes/Passwordroute')



app.use('/user', userRoute)



app.listen(5001);