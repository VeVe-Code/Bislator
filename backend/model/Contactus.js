let mongoose = require('mongoose')

let Schema = mongoose.Schema

let ContactusSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phno:{
        type: String,
        required: true
    },
    msg:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Contactus", ContactusSchema);