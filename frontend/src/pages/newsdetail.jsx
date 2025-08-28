import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../helpers/axios";


function NewsDetail() {
  const { id } = useParams(); // get news id from route
  const [news, setNews] = useState(null);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        let res = await axios.get(`/api/news/${id}`);
        if (res.status === 200) {
          setNews(res.data);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };
    fetchNews();
  }, [id]);

  if (!news) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }


  return (
   <div className="mt-24">
      <div className="min-h-screen bg-gray-50 py-10 px-4 ">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image */}
        <div className="h-64 w-full overflow-hidden">
          <img
            src={import.meta.env.VITE_BACKEND_ASSET_URL+ news.photo}
            alt={news.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {news.title}
          </h1>

          <p className="text-gray-700 mb-4">{news.description}</p>

          <div className="bg-gray-100 rounded-xl p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              About
            </h2>
            <p className="text-gray-600">{news.about}</p>
          </div>
        </div>
      </div>
    </div>
   </div>
  
  );
}

export default NewsDetail;
