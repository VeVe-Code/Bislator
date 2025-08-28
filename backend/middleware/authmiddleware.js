let jwt = require('jsonwebtoken')
const Admin = require('../model/Admin')
let authmiddleware = (req, res, next) => {

//user token 
let token = req.cookies.jwt
if(token){//valid
    jwt.verify(token,process.env.JWT_SECRET,(err,decodedvalue)=>{
       if(err){
        return res.status(401).json({message : "unauthenticated "})
       }else{
        Admin.findById(decodedvalue._id).then(admin=>{
          req.admin =admin
        next()
      })

       } 
    })
  //error

}else{
 return res.status(400).json({message:'token need to provide'})
}



}
module.exports=authmiddleware;