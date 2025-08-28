import axios from "../../helpers/axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";



function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let[error, setError] = useState(null)
  let navigate=useNavigate()

  const register = async (e) => {
   try {
     e.preventDefault();
    // Here you can send the data to your backend
    let data = {
        name,
        email,
        password
    }
let res = await axios.post('/api/admins/register/', data,{
    withCredentials:true
});
if(res.status===200){
 navigate('/admin/service')
}
   } catch (e) {
    setError(e.response.data.error)
   }
}
  

  return (
    <div className="min-h-screen w-full bg-blue-200 p-8 " >
      {/* Glass form card */}
      <div
        className=" relative backdrop-blur-lg bg-white/40 p-8 rounded-2xl shadow-2xl max-w-xl mx-auto border border-white/30 transform transition-transform duration-500 hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105 animate-float"
        style={{ perspective: "1000px" }}
      >
       
        <h2 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-lg text-center">
          Register Form
        </h2>
        <form className="space-y-5" onSubmit={register} >
          {/* Title */}
          <div className="transition-transform duration-300 hover:scale-105">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              
              placeholder="Enter service title"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {!!(error &&  error.name )&& <h1 className="text-red-500 text-sm">{error.name.msg}</h1>}
          </div>

          {/* About */}
          <div className="transition-transform duration-300 hover:scale-105">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              
              placeholder="Enter service title"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {!!(error &&  error.email )&& <h1 className="text-red-600 text-sm ">{error.email.msg}</h1>}
          </div>
       <div className="transition-transform duration-300 hover:scale-105">
  <label className="block text-sm font-medium text-gray-700">
    Password
  </label>
  <input
    type="password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    placeholder="Enter your password"
    className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
  />
  {!!(error &&  error.password )&& <h1 className="text-red-600 text-sm">{error.password.msg} password</h1>}
</div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
           Register
          </button>
     
           
<h1 className="text-sm text-center mt-4">
  Pls <Link to="/admin/login" className="text-blue-600 hover:underline">Login here</Link> 
</h1>
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
export default Register;
