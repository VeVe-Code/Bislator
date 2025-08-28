let mongoose =require('mongoose')
let bcrypt = require('bcrypt')
let Schema = mongoose.Schema;


let AdminSchema = new Schema({

    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }

})

AdminSchema.statics.register = async function (name, email, password)  {
      let adminExists = await this.findOne({email})
    if(adminExists){
        throw new Error('admin already exists')
    }
    let salt = await bcrypt.genSalt();
    let hashValue = await bcrypt.hash(password,salt)

    let admin = await this.create({
        name,
        email,
        password: hashValue
    }) 
 return admin
}


AdminSchema.statics.login = async function (email, password)  {
      let admin = await this.findOne({email})
    if(!admin){
        throw new Error('admin deos not exists ')
    }
 //compare password
 //user.password === password
let isCorrect =await bcrypt.compare(password,admin.password)
    if(isCorrect){
        return admin
    }else{
        throw new Error('Password incorrect')
    }


  
 return admin
}


module.exports= mongoose.model('Admin',AdminSchema)