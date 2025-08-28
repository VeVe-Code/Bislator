let express = require("express");
let servicescontroller = require('../controller/servicescontroller');

let router = express.Router();

// Public - view only
router.get('/api/allservices', servicescontroller.index);
router.get('/api/allservices/:id', servicescontroller.show);

module.exports = router;
