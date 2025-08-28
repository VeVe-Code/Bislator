import React from "react";
import { motion } from "framer-motion";
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

const Contactus = () => {


  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phno, setPhno] = useState("");
  let [msg, setMsg] = useState("");
 let [error,setError]= useState({})

let Createdata = async(e) =>{
try{ e.preventDefault()
  const safeMessage = DOMPurify.sanitize(msg, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
let data = {
  name,
  email,
  phno,
  msg: safeMessage
}

  let res = await axios.post("http://localhost:4000/api/contactus",data,{
      headers: { "Content-Type": "application/json" }
  })
  setName('')
  setEmail('')
  setPhno('')
  setMsg('')
  alert('already submitted')
  // if(res===200){
  //   console.log(res)
  // }
  setError('')
 console.log(res) 
}catch(e){
//  setError(Object.keys(e.response.data.error))
 setError(e.response.data.error)



}}

  return (
   <div className="min-h-screen bg-gray-50">
      {/* Section */}
      <section className="h-screen py-20 px-6 md:px-12 lg:px-24">
    <div className="min-h-screen bg-blue-950 rounded-2xl from-blue-50 to-indigo-100 flex flex-col items-center py-12 px-4 mt-20">
      {/* Header */}
      <div className="max-w-3xl w-full">
        <div className="bg-white shadow-2xl rounded-3xl p-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-gray-600 mb-12 text-center text-lg">
            We’d love to hear from you! Get in touch with us in the way that’s
            easiest for you.
          </p>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Phone */}
            <motion.div
           
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay:  0.2 }} className="flex items-start space-x-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 hover:shadow-lg transition">
              <PhoneIcon className="h-10 w-10 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Phone</h2>
                <p className="text-gray-600 mt-1">
                  Call us if you want a quick chat with our team.
                </p>
                <p className="text-blue-600 font-medium mt-2 cursor-pointer hover:underline">
                  02-708-7999
                </p>
                <p className="text-sm text-gray-500">
                  Mon - Sun, 10:00 - 22:00
                </p>
              </div>
            </motion.div>
           
            {/* Email */}
             <motion.div
           
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay:  0.2 }}className="flex items-start space-x-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 hover:shadow-lg transition">
              <EnvelopeIcon className="h-10 w-10 text-green-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Email</h2>
                <p className="text-gray-600 mt-1">
                  Drop us an email anytime, and we’ll get back to you soon.
                </p>
                <p className="text-green-600 font-medium mt-2 cursor-pointer hover:underline">
                  customerrelations.ikeath@ikano.asia
                </p>
              </div>
           </motion.div>

            {/* Social Media */}
           <motion.div
           
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay:  0.2 }} className="flex items-start space-x-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl p-6 hover:shadow-lg transition">
              <ChatBubbleBottomCenterTextIcon className="h-10 w-10 text-pink-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Social Media
                </h2>
                <p className="text-gray-600 mt-1">
                  Connect with us and join the conversation.
                </p>
                <div className="flex space-x-4 mt-3">
                  <a href="#" className="text-blue-600 hover:underline">
                    Line
                  </a>
                  <a href="#" className="text-blue-600 hover:underline">
                    Facebook
                  </a>
                  <a href="#" className="text-blue-600 hover:underline">
                    Instagram
                  </a>
                  <a href="#" className="text-blue-600 hover:underline">
                    YouTube
                  </a>
                </div>
              </div>

                  </motion.div>

            {/* FAQ */}
            <motion.div
           
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay:  0.2 }}  className="flex items-start space-x-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-6 hover:shadow-lg transition">
              <QuestionMarkCircleIcon className="h-10 w-10 text-yellow-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">FAQ</h2>
                <p className="text-gray-600 mt-1">
                  Get instant answers in our frequently asked questions.
                </p>
                <a
                  href="#"
                  className="text-yellow-600 font-medium mt-2 inline-block hover:underline"
                >
                  Browse FAQs →
                </a>
              </div>
            </motion.div>
          </div>

          {/* Feedback Form */}
          <div className="mt-12 bg-amber-50 from-indigo-50 to-indigo-100 rounded-2xl p-8 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Contact us
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Have a question or need help? Reach out to us and we’ll get back to you as soon as possible.
            </p>

            <form className="space-y-6 max-w-xl mx-auto" onSubmit={Createdata}>
              <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
                <label className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  onChange ={e => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your name"
                />
    {error.name && <p className="text-red-600 text-sm">{error.name.msg}</p>}
              </motion.div>
            

                <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                value={phno}
                onChange={e=> setPhno(e.target.value)}
                  type="text"
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your phone number"
                />
                {error.phno && <p className="text-red-600 text-sm">{error.phno.msg}</p>}
               </motion.div>

             <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
                <label className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                  type="email"
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                />
                {error.email && <p className="text-red-600 text-sm">{error.email.msg}</p>}
              </motion.div>

               <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                value={msg}
                onChange={e => setMsg(e.target.value)}
                  rows="4"
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Write your feedback..."
                ></textarea>
                {error.msg && <p className="text-red-600 text-sm">{error.msg.msg}</p>}
          </motion.div>

              <motion.button
              
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay:  0.1 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-[1.02]"
              >
                Submit
              </motion.button>
              <ul className="list-disc pl-3">
                {!!error.length && error.map((error,i) => (
                    <li className="text-red-600 text-sm" key={i}>{error} is invalid</li>
                ))}
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
    </section>
</div>
  );
};

export default Contactus;
