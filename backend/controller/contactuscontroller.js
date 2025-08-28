
// const Service = require("../model/Service");
// let mongoose = require('mongoose') 

let mongoose = require('mongoose');
const Contactus = require("../model/Contactus");
const { JSDOM } = require('jsdom');
const createDOMPurify = require('isomorphic-dompurify');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);


let ContactusController = {
  index: async(req, res) => {
     const name = req.query.name || ""; 
    let data = await Contactus.find({
     name: { $regex: name, $options: "i" }// case-insensitive partial match
    }).sort({createdAt:-1});
    return res.json(data);
  },
  store: async(req, res) => {
  
  try { let {name,email,phno,msg}=req.body
     const safeMsg = DOMPurify.sanitize(msg, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    let data = await Contactus.create({
        name,
        email,
        phno,
        msg,
         msg: safeMsg       
    })
    return res.json(data);}catch(e){
      return res.status(400).json({msg:"error message"})
    }
    
  

},

destroy: async (req, res) => {
  try {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    let data = await Contactus.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ msg: "data not found" });
    }

    return res.json({ msg: "Contactus deleted successfully", data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Server error" });
  }
}


//   destroy: async(req, res) => {
//      try {
//     let id = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ msg: "Invalid ID" });
//     }

//     let service = await Service.findByIdAndDelete(id);

//     if (!service) {
//       return res.status(404).json({ msg: "Service not found" });
//     }

//     return res.json(service);

//   } catch (e) {
//     console.error(e); // Optional: log the actual error
//     return res.status(500).json({ msg: "Server error" });
//   }
//   },
}

module.exports = ContactusController;