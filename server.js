

let express = require('express');

let cors = require('cors')
let app = express();

let database = require('./Routes/Rooms')

let users = require('./Routes/roomforuser')

app.use(express.json())
app.use(cors());

app.use('/', database)

app.use('/users', users)

app.listen(3001);