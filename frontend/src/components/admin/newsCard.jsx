import axios from '../../helpers/axios';
import React from 'react';
import { Link } from 'react-router-dom';

function NewsCard({ n, onDelete }) {
  let ondelete = async () => {
    let response = await axios.delete("/api/news/" + n._id);
    if (response.status === 200) {
      onDelete(n._id);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl mt-3 
                    w-full max-w-4xl mx-auto mb-4 border border-gray-200
                    hover:shadow-3xl transition-shadow duration-300">

      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={import.meta.env.VITE_BACKEND_ASSET_URL + n.photo}
          alt={n.title}
          className="w-full mx-auto object-contain sm:w-56 h-64 rounded-xl shadow-md 
                     hover:scale-105 transition-transform duration-300"
        />

        <div className="flex flex-col justify-between flex-1 space-y-4">
          <div>
            <h3 className="text-amber-500 text-2xl font-extrabold break-words mb-2">
              {n.title}
            </h3>
            <h4 className="text-lg font-semibold text-gray-800 break-words">
              {n.description}
            </h4>
            <Link
              to={`/admin/news/NewsDetails/${n._id}`}
              className="text-gray-500 font-medium cursor-pointer hover:text-amber-600"
            >
              about – click here
            </Link>
            <p className="text-sm text-gray-400 italic">
              {new Date(n.createdAt).toLocaleDateString()} –{" "}
              {new Date(n.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Link
              to={`/admin/news/edit/${n._id}`}
              className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 
                         text-white font-semibold rounded-2xl shadow-sm 
                         transition-transform transform hover:scale-105 
                         w-full sm:w-auto text-center"
            >
              Edit
            </Link>
            <button
              onClick={ondelete}
              className="bg-red-600 hover:bg-red-700 px-3 py-2 
                         text-white font-semibold rounded-2xl shadow-sm 
                         transition-transform transform hover:scale-105 
                         w-full sm:w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
