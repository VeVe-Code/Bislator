let express = require('express')
let Newscontroller = require('../controller/Newscontroller')
let router = express.Router()
const { body, validationResult } = require('express-validator');
let handleerrormsg =require('../middleware/handleerrormsg')
let AuthMiddleware = require('../middleware/authmiddleware')
let upload = require('../helper/upload')

router.get ('/api/news', AuthMiddleware,Newscontroller.index) 
router.post ('/api/news', AuthMiddleware,[ body('title').notEmpty(),body('description').notEmpty(),body('about').notEmpty()], handleerrormsg,Newscontroller.store) 
router.get ('/api/news/:id',Newscontroller.show) 
router.post ('/api/news/:id/upload', AuthMiddleware, [
    upload.single("photo"),
    body('photo').custom((value,{req})=>{
 if(!req.file){
    throw new Error("photo is required")
 }
 if(!req.file.mimetype.startsWith("image")){
    throw new Error("photo must be an image")
 }
    return true
    })
],handleerrormsg,Newscontroller.upload) 
router.delete ('/api/news/:id', AuthMiddleware,Newscontroller.destory) 
router.patch ('/api/news/:id', AuthMiddleware,Newscontroller.update) 


module.exports=router