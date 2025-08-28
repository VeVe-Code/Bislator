let express = require('express')
require('dotenv').config()
var morgan = require('morgan')
let mongoose = require('mongoose')
let servicesRoute = require('./routes/services')
let adminRoute = require ('./routes/admin')
let PublicRoute =require ('./routes/Publicservices')
let newsRoute = require('./routes/news')
let ContactusRoute = require('./routes/contactus')
let PublicsnewsRoute = require('./routes/publicnews')
let cors = require('cors')
let app = express()
var cookieParser = require('cookie-parser')
let mongoURL = "mongodb+srv://kaungzinthu:test1234@cluster0.rdmhdpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let PORT = process.env.PORT || 4000;
mongoose.connect(mongoURL).then(()=>{
    console.log("connect to db ")
    app.listen(PORT,()=>{
    console.log("server is running"+PORT)
})
})
app.use(cors(
  {
    origin:'https://bislator-frontend.onrender.com',
    credentials:true
  }
))//local development ---WaRNING
app.use(express.static('public'))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())


app.get('/',(req,res)=>{
  return  res.json({msg:"hello"})
})
app.use(servicesRoute)
app.use('/api/admins',adminRoute)
app.use(PublicRoute)
app.use(PublicsnewsRoute)
app.use(newsRoute)
app.use(ContactusRoute)
app.get('/set-cookie',(req,res)=>{
   res.cookie('name','aungaung')
   res.cookie('important-key','value',{httpOnly: true})
  return  res.send("cookie already set")
})
app.get('/get-cookie',(req,res)=>{
   let cookies = req.cookies
  return  res.send(cookies)

})

