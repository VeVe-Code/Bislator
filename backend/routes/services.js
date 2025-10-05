let express = require("express")
let servicescontroller = require('../controller/servicescontroller')
let handleerrormsg =require("../middleware/handleerrormsg")
let AuthMiddleware = require('../middleware/authmiddleware')
const { body, validationResult } = require('express-validator');



let router = express.Router()
//u have to put//   ---> AuthMiddleware
router.get('/api/services',AuthMiddleware,servicescontroller.index)

router.post('/api/services',
    [
         body('title').notEmpty(),
            body('about').notEmpty()
        
    ],

handleerrormsg
,servicescontroller.store)

router.get('/api/services/:id',AuthMiddleware,servicescontroller.show)

router.delete('/api/services/:id',AuthMiddleware, servicescontroller.destroy)

router.patch('/api/services/:id', AuthMiddleware,servicescontroller.update)



module.exports = router
