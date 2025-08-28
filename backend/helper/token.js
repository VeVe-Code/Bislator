let jwt = require ('jsonwebtoken')


module.exports= function createtoken(_id){
 let maxAge = 3 * 24 * 60 * 60
    return jwt.sign({_id},process.env.JWT_SECRET,{expiresIn : maxAge})
}