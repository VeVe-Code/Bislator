
let express = require("express");
let servicescontroller = require('../controller/Newscontroller');

let router = express.Router();


router.get('/api/allnews', servicescontroller.index);
router.get('/api/allnews/:id', servicescontroller.show);



module.exports = router;