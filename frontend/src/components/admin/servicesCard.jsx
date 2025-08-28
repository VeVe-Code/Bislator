import axios from '../../helpers/axios';
import React from 'react'
import { Link } from 'react-router-dom'

function servicesCard({service,onDeleted}) {
    let deleteservices= async()=>{
        
        
        let res = await axios.delete(`/api/services/${service._id}`);
 if(res.status===200) {
    onDeleted(service._id)
 }
    }
    
  return (
    <div
                    className="bg-white p-6 rounded-2xl space-y-2 shadow-2xl mt-3 mb-10 " key={service._id}

                >
                    
                        <div className='flex justify-between'>
                            <div>
                               <h3 className="text-amber-400 text-xl font-bold">{service.title}</h3>
                       </div>
                            <div className='space-x-2'>
                                <Link
                                to={`/admin/service/edit/${service._id}`}
                                className="bg-yellow-400 px-3 py-1 text-white rounded-2xl"
                            >
                                Edit
                            </Link>
                            <button onClick={deleteservices}
                                className="bg-red-600 px-3 py-1 text-white rounded-2xl"
                            >
                                Delete
                            </button>
                            </div>
                      
                        </div>
                        <h3 className="text-amber-400 text-xl font-bold">{service.about}</h3>
                
               

                    <p className="text-gray-500">Published at -{service.createdAt}</p>
                </div>
        )
}

export default servicesCard
