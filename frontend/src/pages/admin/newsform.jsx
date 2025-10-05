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
    let[loading, setLoading]= useState(false)
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
          setLoading(true)
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

 let uploadRes = await axios.post(`/api/news/${res.data.id}/upload`,formData,{
    headers:{
        Accept: 'multipart/form-data'
    }
 })
 console.log(uploadRes)
    if(res.status === 200){
      setLoading(false)
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
  className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
>
 { loading && <div role="status" className="flex items-center">
    <svg
      aria-hidden="true"
      className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 
        100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 
        0.59082 50 0.59082C77.6142 0.59082 100 
        22.9766 100 50.5908ZM9.08144 50.5908C9.08144 
        73.1895 27.4013 91.5094 50 91.5094C72.5987 
        91.5094 90.9186 73.1895 90.9186 
        50.5908C90.9186 27.9921 72.5987 9.67226 
        50 9.67226C27.4013 9.67226 9.08144 
        27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 
        97.8624 35.9116 97.0079 33.5539C95.2932 
        28.8227 92.871 24.3692 89.8167 
        20.348C85.8452 15.1192 80.8826 
        10.7238 75.2124 7.41289C69.5422 
        4.10194 63.2754 1.94025 56.7698 
        1.05124C51.7666 0.367541 46.6976 
        0.446843 41.7345 1.27873C39.2613 
        1.69328 37.813 4.19778 38.4501 
        6.62326C39.0873 9.04874 41.5694 
        10.4717 44.0505 10.1071C47.8511 
        9.54855 51.7191 9.52689 55.5402 
        10.0491C60.8642 10.7766 65.9928 
        12.5457 70.6331 15.2552C75.2735 
        17.9648 79.3347 21.5619 82.5849 
        25.841C84.9175 28.9121 86.7997 
        32.2913 88.1811 35.8758C89.083 
        38.2158 91.5421 39.6781 93.9676 
        39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>}
  <span>{id ? "Edit" : "Create"} News</span>
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