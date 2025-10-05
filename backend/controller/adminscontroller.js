const Admin = require("../model/Admin")
let createToken = require('../helper/token')


let AdminController = {
  me: async (req, res) => {
    return  res.json(req.admin)


  }
  ,
  login: async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.login(email, password);

    const token = createToken(admin.id); // Sequelize uses `id`, not `_id`
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000
    });

    return res.json({
      admin: { id: admin.id, name: admin.name, email: admin.email },
      token
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
},
  

    register:async(req,res)=>{ 
   try{
     let {name,email,password} = req.body;
   let admin = await Admin.register(name,email,password)
   // create token 
   let token = createToken(admin.id)
    res.cookie('jwt',token,{httpOnly : true, maxAge:  3 * 24 * 60 * 60 * 1000 })
    return res.json({admin,token})
}catch(e){
        return res.status(400).json({error : e.message })
    }

    },


     logout :async (req,res)=>{

   
    res.cookie('jwt','',{ maxAge:1 })
     return res.json({msg:"user logged out"})
     }
    }
module.exports=  AdminController
