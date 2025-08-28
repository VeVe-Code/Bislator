const Service = require("../model/Service");
let mongoose = require('mongoose') 

let servicescontroller = {
  index: async(req, res) => {
    let limit = 6;
    let page = req.query.page
    console.log(page)

    let services = await Service.find().skip((page - 1)*limit).limit(limit).sort({createdAt:-1});
    let totalservicescount = await Service.countDocuments()
    let totalpagescount = Math.ceil(totalservicescount/limit)
    console.log(totalpagescount)
   
     let links = {
        nextPage : totalpagescount === page ? false: true,
        previousPage : page === 1 ? false : true,
        currentPage :page,
        loopLink:[]}

        for (let index = 0; index <totalpagescount; index++) {
          let number =index+1
       links.loopLink.push({number})
          
        }
        console.log(links.previousPage)

        let response ={
          links,
          data:services
        }
    return res.json(response);
  },
  store: async(req, res) => {

    let {title,about}=req.body
    let service = await Service.create({
        title,
        about
    })
    return res.json(service);
    
  },
show: async (req, res) => {
  try {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    let service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    return res.json(service);

  } catch (e) {
    console.error(e); // Optional: log the actual error
    return res.status(500).json({ msg: "Server error" });
  }
},
  destroy: async(req, res) => {
     try {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    let service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    return res.json(service);

  } catch (e) {
    console.error(e); // Optional: log the actual error
    return res.status(500).json({ msg: "Server error" });
  }
  },
  update: async(req, res) => {
    try {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    let service = await Service.findByIdAndUpdate(id,{
        ...req.body
    });

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    return res.json(service);

  } catch (e) {
    console.error(e); // Optional: log the actual error
    return res.status(500).json({ msg: "Server error" });
  }
  
  },
};

module.exports = servicescontroller;