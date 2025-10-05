import axios from '../../helpers/axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ServicesCard({ service, onDeleted }) {
  let [loading, setLoading] = useState(false);

  let deleteservices = async () => {
    setLoading(true);
    let res = await axios.delete(`/api/services/${service.id}`);
    if (res.status === 200) {
      onDeleted(service.id);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl mt-4 mb-6 w-full max-w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
      
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        {/* Title */}
        <h3 className="text-amber-500 text-lg sm:text-xl md:text-2xl font-bold break-words text-center sm:text-left">
          {service.title}
        </h3>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <Link
            to={`/admin/service/edit/${service._id}`}
            className="bg-yellow-400 px-4 py-2 text-white rounded-2xl shadow hover:bg-yellow-500 transition-all text-center text-sm sm:text-base"
          >
            Edit
          </Link>

          <button
            onClick={deleteservices}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-red-600 px-4 py-2 text-white font-medium rounded-2xl shadow-md hover:bg-red-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading && (
              <svg
                aria-hidden="true"
                className="inline w-4 h-4 sm:w-5 sm:h-5 text-gray-200 animate-spin fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 
                     100.591 50 100.591C22.3858 100.591 
                     0 78.2051 0 50.5908C0 22.9766 
                     22.3858 0.59082 50 0.59082C77.6142 
                     0.59082 100 22.9766 100 50.5908ZM9.08144 
                     50.5908C9.08144 73.1895 27.4013 
                     91.5094 50 91.5094C72.5987 91.5094 
                     90.9186 73.1895 90.9186 50.5908C90.9186 
                     27.9921 72.5987 9.67226 50 
                     9.67226C27.4013 9.67226 9.08144 
                     27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 
                     38.4038 97.8624 35.9116 
                     97.0079 33.5539C95.2932 
                     28.8227 92.871 24.3692 
                     89.8167 20.348C85.8452 
                     15.1192 80.8826 10.7238 
                     75.2124 7.41289C69.5422 
                     4.10194 63.2754 1.94025 
                     56.7698 1.05124C51.7666 
                     0.367541 46.6976 0.446843 
                     41.7345 1.27873C39.2613 
                     1.69328 37.813 4.19778 
                     38.4501 6.62326C39.0873 
                     9.04874 41.5694 10.4717 
                     44.0505 10.1071C47.8511 
                     9.54855 51.7191 9.52689 
                     55.5402 10.0491C60.8642 
                     10.7766 65.9928 12.5457 
                     70.6331 15.2552C75.2735 
                     17.9648 79.3347 21.5619 
                     82.5849 25.841C84.9175 
                     28.9121 86.7997 32.2913 
                     88.1811 35.8758C89.083 
                     38.2158 91.5421 39.6781 
                     93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
            <span>{loading ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm sm:text-base md:text-lg break-words mt-3">
        {service.about}
      </p>

      {/* Published Date */}
      <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-2">
        Published at - {new Date(service.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ServicesCard;
