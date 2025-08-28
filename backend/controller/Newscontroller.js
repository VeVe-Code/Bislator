const News = require("../model/News")
let mongoose = require('mongoose')

let removefile = require('../helper/remove')
let Newscontroller = {
     index : async (req,res) => {
             const title = req.query.title || ""; 
              const query = title
    ? { title: { $regex: new RegExp(title, "i") } } // ✅ Safe regex
    : {};
        let limit = 8;
           let page = req.query.page
           console.log(page)
       
           let news = await News.find(query).skip((page - 1)*limit).limit(limit).sort({createdAt:-1});
           let totalnewscount = await News.countDocuments()
           let totalpagescount = Math.ceil(totalnewscount/limit)
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
                 data:news
               }
           return res.json(response);
         },
    store:async(req,res)=>{
       try{ let {title,description,about} = req.body
        let news  = await News.create({title,description,about})
        console.log(news)
            return res.json(news)}catch(e){
                return res.status(400).json({msg:"error massage"})
            }
    },
    show:async(req,res)=>{
        try{let id = req.params.id 
            if(!mongoose.Types.ObjectId.isValid(id)){
               return res.status(400).json({msg:"invalid id"})
            }
        let news = await News.findById(id)
        if(!news){
              return res.status(404).json({msg:"not found news"})
        }
        return res.json(news)}catch(e){
    return res.status(400).json({msg:"server error"})
        }
    }
    ,destory:async(req,res)=>{
        try{let id = req.params.id 
            if(!mongoose.Types.ObjectId.isValid(id)){
               return res.status(400).json({msg:"invalid id"})
            }
        let news = await News.findByIdAndDelete(id)
        if(!news){
              return res.status(404).json({msg:"not found news"})
        }
        return res.json(news)}catch(e){
    return res.status(400).json({msg:"server error"})
        }
    },update:async(req,res)=>{
         try{let id = req.params.id 
            if(!mongoose.Types.ObjectId.isValid(id)){
               return res.status(400).json({msg:"invalid id"})
            }
        let news = await News.findByIdAndUpdate(id,{
            ...req.body
        })
       await  removefile(__dirname + '/../public' + news.photo)
        if(!news){
              return res.status(404).json({msg:"not found news"})
        }
        return res.json(news)}catch(e){
    return res.status(400).json({msg:"server error"})
        }
    },   upload : async (req,res) => {
        try {
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'not a valid id'});
            }
            let news = await News.findByIdAndUpdate(id, {
                photo : '/'+ req.file.filename
            });
         await removefile(__dirname + '/../public' + news.photo)
            if(!news) {
             return res.status(404).json({ msg : 'news not found'});
            }
            return res.json(news);
        }catch(e) {
            console.log(e);
            return res.status(500).json({ msg : 'internet server error'});
        }
    }
}

module.exports = Newscontroller