

let express = require('express');
let router = express.Router();

let userobject = require('../Controller/user')

router.get('/', userobject.getallinformation)

router.post('/', userobject.createrooms)

router.delete('/:id', userobject.deleteroom)

router.put('/:id', userobject.updaterooms)

module.exports = router