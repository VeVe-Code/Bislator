import axios from "../../helpers/axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function ServiceForm() {
    let {id} = useParams()
   let [title,setTitle] = useState('')
   let [about,setAbout] = useState('') 
   let [error, setError] = useState({})
    let naviagte = useNavigate()
   
useEffect(()=>{
let Fetchservices=async ()=>{
    if(id){
        let res = await axios.get('/api/services/' + id);
        if (res.status===200){
           setTitle(res.data.title)
           setAbout(res.data.about)
        }
    }
}
 Fetchservices()
},[id])



   let createService =async(e) => {
        try {  e.preventDefault();
       let service ={
        title,
        about
       }
       let res
if(id){  
   res = await axios.patch('/api/services/'+ id, service);
}else{
      res   = await axios.post('/api/services', service);
}
    if(res.status === 200){
        naviagte('/admin/service')
    }       
}catch(e){
        setError(e.response.data.error)
       }
   }
  return (
    <div className="min-h-screen w-full bg-blue-200 p-8 md:mt-1 mt-16" >
      {/* Glass form card */}
      <div
        className="relative backdrop-blur-lg bg-white/40 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto border border-white/30 transform transition-transform duration-500 hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105 animate-float"
        style={{ perspective: "1000px" }}
      >
        {id ? <h2 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-lg text-center">
          Edit Service
        </h2>: <h2 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-lg text-center">
          Create Service
        </h2>}
        <form className="space-y-5" onSubmit={createService}>
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
           {id ? 'Edit' : 'Create'} Service
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

export default ServiceForm;
