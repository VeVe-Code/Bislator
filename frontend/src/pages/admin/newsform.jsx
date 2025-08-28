import axios from "../../helpers/axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function NewsForm() {
   const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [about, setAbout] = useState('')
    const [file, setFile] = useState(null)
    let [preview, setPreview] = useState(null)
    const [error, setError] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
   
useEffect(()=>{
let Fetchnews=async ()=>{
    if(id){
        let res = await axios.get('/api/news/' + id);
        if(res.status===200){
     setTitle(res.data.title)
     setDescription(res.data.description)   
        setAbout(res.data.about) 
                setPreview( import.meta.env.VITE_BACKEND_ASSET_URL+ res.data.photo)
    }

    }
}
 Fetchnews()
},[id])



   let createNews =async(e) => {
        try {  e.preventDefault();
       let news ={
         title,
         description,
        about
       }
       let res


if(id){  
   res = await axios.patch('/api/news/'+ id, news);
}else{
      res   = await axios.post('/api/news', news);
}


let formData = new FormData();
formData.set('photo',file)

 let uploadRes = await axios.post(`/api/news/${res.data._id}/upload`,formData,{
    headers:{
        Accept: 'multipart/form-data'
    }
 })
 console.log(uploadRes)
    if(res.status === 200){
        navigate('/admin/news')
    }       
}catch(e){
        setError(e.response.data.error)
       }
   }
    let upload = async (e) => {
        let file = e.target.files[0]
        setFile(file)
        let fileReader = new FileReader()
        fileReader.onload =  (e) => {
           setPreview(e.target.result)
        }
        fileReader.readAsDataURL(file)
    } 
  return (
    <div className="min-h-screen w-full bg-blue-200 p-8 md:mt-1 mt-16" >
      {/* Glass form card */}
      <div
        className="relative backdrop-blur-lg bg-white/40 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto border border-white/30 transform transition-transform duration-500 hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105 animate-float"
        style={{ perspective: "1000px" }}
      >
        {id ? <h2 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-lg text-center">
          Edit News
        </h2>: <h2 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-lg text-center">
          Create News
        </h2>}
        <form className="space-y-5" onSubmit={createNews}>


 

   <div className="transition-transform duration-300 hover:scale-105"> <input type="file"onChange={upload}  className="mt-1 block w-55 rounded-md border border-black p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mb-3" />
   {preview&& <img src={preview} alt="" className="w-96" />}</div>

          {/* Title */} 
          <div className="transition-transform duration-300 hover:scale-105">
          
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              
              placeholder="Enter service title"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
              {error.title && <p className="text-red-600 text-sm">{error.title.msg}</p>}
          </div>
            <div className="transition-transform duration-300 hover:scale-105">
            <label className="block text-sm font-medium text-gray-700">
           Description
            </label>
            <textarea
            value={description}
            onChange={e=>setDescription(e.target.value)}
              rows="4"
              placeholder="Describe the service"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
              {error.description && <p className="text-red-600 text-sm">{error.description.msg}</p>}
          </div>


          {/* About */}
          <div className="transition-transform duration-300 hover:scale-105">
            <label className="block text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
            value={about}
            onChange={e=>setAbout(e.target.value)}
              rows="4"
              placeholder="Describe the service"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
              {error.about && <p className="text-red-600 text-sm">{error.about.msg}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
           {id ? 'Edit' : 'Create'} News
          </button>
        </form>
      </div>

      {/* Floating animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default NewsForm;
