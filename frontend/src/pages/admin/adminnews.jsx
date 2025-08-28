import axios from '../../helpers/axios'
import React, { useEffect, useState } from 'react'
import NewsCard from '../../components/admin/newsCard'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Pagination from '../../components/admin/newsPagination'
import { motion } from "framer-motion";
import { Search } from "lucide-react";
function AdminNews() {
    let [news, setNews] = useState([])
    let [links, setLinks] = useState(null)
    let naviagte = useNavigate()
      let [search, setSearch] = useState("");
      const [focused, setFocused] = useState(false);
    let[loading, setLoading] = useState(false)
 let location= useLocation()
 let searchQuery =new URLSearchParams(location.search)
 let page = searchQuery.get('page')
 page = parseInt(page) ? parseInt(page) :1
useEffect(() => {
  let fetchNews = async () => {
    setLoading(true)
    let res = await axios.get('/api/news?page=' + page);
    if (res.status === 200) {
      let data = res.data;
      setNews(data.data);
      setLinks(data.links);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
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
}, [page, search]);

let onDelete = (_id) => {
    if(news.length === 1 && page > 1 ){

        naviagte('/admin/news/?page=' + (page - 1))
    }else{
        setNews(prev => prev.filter(n => n._id !== _id))
    }
    
}

    return (
        <div className="p-4 md:mt-1.5 mt-14 ">
             <div className="mx-auto text-center">
  <h1 className="text-xl font-bold md:hidden text-gray-800 mb-6">
    Admin News
  </h1>
</div>
          <div className='flex justify-between items-center mb-4'>
            <div className='text-2xl mr-28 font-bold hidden md:block text-gray-800 mb-6 whitespace-nowrap'>Admin News</div>
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="flex items-center justify-end w-full p-4"
>
  <motion.div
    animate={{ 
      width: focused 
        ? "90%"   // mobile expands full
        : "70%"   // mobile default
    }}
    transition={{ duration: 0.4, type: "spring" }}
    className="flex items-center rounded-2xl px-3 py-2 bg-white/10 shadow-2xl border hover:border-2 
               sm:w-[16rem] sm:animate-none sm:transition-none 
               md:w-[20rem] lg:w-[24rem]"
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
            <div>
                <Link to="/admin/news/create" className='bg-blue-500 p-2 rounded text-white'> Create </Link>
            </div>
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
      ) :!!news.length ? (
                news.map(n => (
                <NewsCard n={n} key={n._id} onDelete={onDelete}/>
                ))
            ): <h1>no data</h1>}
           {!!links&& <Pagination links={links} page={page|| 1}/> }
        </div>
    )
}

export default AdminNews
