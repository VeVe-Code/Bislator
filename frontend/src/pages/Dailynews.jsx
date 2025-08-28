import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from '../helpers/axios';
import { Link, useLocation } from 'react-router-dom';

import { Search } from "lucide-react";

function DailyNews() {
  const [news, setNews] = useState([]);
  const [links, setLinks] = useState(null);
  let [loading, setLoading]= useState(false)
  const location = useLocation();
   let [search, setSearch] = useState("");
      const [focused, setFocused] = useState(false);
  let searchQuery = new URLSearchParams(location.search);
  let page = parseInt(searchQuery.get('page')) || 1;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      const res = await axios.get("/api/allnews?page=" + page);
      if (res.status === 200) {
        const data = res.data;
        setNews(data.data);
        setLinks(data.links);
      }
      setLoading(false)
    };
      let searchNews = async () => {
    let res = await axios.get('/api/news?title=' + search);
    if (res.status === 200) {
      let data = res.data;
      setNews(data.data);
      setLinks(null);
    }
  };

  if (search) {
    searchNews();
  } else {
    fetchNews();
  }
    fetchNews();
  }, [page,search]);

  return (
    
<div className="min-h-screen bg-gray-50">
      {/* Section */}
      <section className="h-screen py-20 px-6 md:px-12 lg:px-24">
     <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-10 lg:px-52 py-2 gap-4 mt-20">
  {/* Title */}
  <h2 className="text-2xl md:text-3xl font-bold text-left md:text-center mb-2 md:mb-0">
    News
  </h2>

  {/* Search */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center justify-start md:justify-center lg:justify-end w-full md:w-auto"
  >
    <motion.div
      animate={{
        width: focused
          ? "100%" // expands fully on focus (mobile)
          : "90%",
      }}
      transition={{ duration: 0.4, type: "spring" }}
      className="flex items-center rounded-2xl px-3 py-2 bg-white shadow-lg border 
                 w-full sm:w-[16rem] md:w-[20rem] lg:w-[24rem]"
    >
      <Search className="text-gray-500 mr-2" size={20} />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search data..."
        className="w-full bg-transparent outline-none text-sm sm:text-base"
      />
    </motion.div>
  </motion.div>
</div>
       
          {loading ? (
        // ✅ Spinner Section
        <div
          role="status"
          className="flex justify-center items-center h-40"
        >
                 <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only">Loading...</span>

        </div>
      ) : news.length > 0 ? (
        // ✅ Data Section
        news.map((n) => (
          <motion.div
            key={n._id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-4 sm:p-6 rounded-2xl shadow-md mt-6 w-full max-w-5xl mx-auto mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
              {/* Image */}
              <img
                src={import.meta.env.VITE_BACKEND_ASSET_URL + n.photo}
                alt="News"
                className="w-full sm:w-52 h-40 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              />

              {/* Content */}
              <div className="flex-1 space-y-3">
                <h3 className="text-black md:hover:text-orange-500 text-xl sm:text-2xl font-bold break-words">
                  {n.title}
                </h3>
                <p className="text-gray-800 text-md">{n.description}</p>
                <Link
                  to={`/Newsdetail/${n._id}`}
                  className="text-blue-500 hover:underline font-medium"
                >
                  News Details
                </Link>
                <p className="text-sm text-gray-400 italic mt-3">
                  {new Date(n.createdAt).toLocaleDateString()} -{" "}
                  {new Date(n.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        // ✅ No Data Section
        <h1 className="text-center text-gray-500">no data</h1>
      )}


      {/* Pagination */}
      {!!links && (
        <div className="mt-6">
          <div className="flex justify-center">
            <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              {/* Previous */}
              <Link
                to={`/Dailynews/?page=${links.previousPage ? page - 1 : page}`}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.83 10l3.94 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </Link>

              {/* Numbered Links */}
              {links.loopLink.map((link) => (
                <Link
                  key={link.number}
                  to={`/Dailynews/?page=${link.number}`}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                    link.number === page
                      ? 'bg-orange-400 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.number}
                </Link>
              ))}

              {/* Next */}
              <Link
                to={`/Dailynews/?page=${links.nextPage ? page + 1 : page}`}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.17 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </Link>
            </nav>
          </div>
        </div>
      )}
            </section>
    </div>
          
  );
}

export default DailyNews;