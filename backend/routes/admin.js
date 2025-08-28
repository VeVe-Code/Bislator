let express = require ("express")
let AdminController = require('../controller/adminscontroller')
let router = express.Router()
const { body, validationResult } = require('express-validator');
let handleerrormsg =require("../middleware/handleerrormsg");
const Admin = require("../model/Admin");
let AuthMiddleware = require('../middleware/authmiddleware')


router.get('/me', AuthMiddleware, AdminController.me)

router.post('/login',AdminController.login)

router.post('/logout',AdminController.logout)

router.post('/register', [
         body('name').notEmpty(),
              body('email').custom(async value => {
    const admin = await Admin.findOne({email:value});
    if (admin) {
      throw new Error('E-mail already in use');
    }
  }),
             body('password').notEmpty()
        
    ],

handleerrormsg,AdminController.register)




module.exports= router