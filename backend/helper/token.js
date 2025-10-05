let jwt = require ('jsonwebtoken')


module.exports= function createtoken(id){
 let maxAge = 3 * 24 * 60 * 60
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn : maxAge})
}