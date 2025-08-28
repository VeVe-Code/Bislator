let express = require("express");
let ContactusController = require('../controller/contactuscontroller');
const { body, validationResult } = require('express-validator');

let router = express.Router();

// Public - view only
router.get('/api/contactus', ContactusController.index);
// router.get('/api/contactus', servicescontroller.post);
router.post('/api/contactus', [
         body('name').notEmpty(),
            body('email').notEmpty().isEmail().withMessage('Invalid email format'),
            body('phno').notEmpty().isMobilePhone().withMessage('Invalid phone number'),
            body('msg').notEmpty().withMessage('Message cannot be empty')
        ], 

handleerrormsg
,ContactusController.store);

router.delete('/api/contactus/:id', ContactusController.destroy);

module.exports = router;
