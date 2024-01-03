

let express = require('express');
let routes = express.Router(); 

let usersobject = require('../Controller/users')

routes.get('/', usersobject.getallinformation)

routes.post('/', usersobject.createusers)






module.exports = routes