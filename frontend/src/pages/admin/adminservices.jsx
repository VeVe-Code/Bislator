import axios from '../../helpers/axios'
import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import ServiceCard from '../../components/admin/servicesCard'
import Pagination from '../../components/admin/pagination'
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";




function adminservices() {
   
    let[links,setLinks]=useState(null)
 let [services, setServices] = useState([])
 let location = useLocation();
 let[loading,setLoading] = useState(false)
 let searchQuery = new URLSearchParams(location.search)
 let page = searchQuery.get('page')
  page = parseInt(page)? parseInt(page) : 1
 let navigate=useNavigate()
console.log(page)

    useEffect(() => {
        let fetchServices = async () => {
            setLoading(true)
         let response =    await axios.get("/api/services?page="+page);
         if(response.status===200){
                    let data = response.data
                    setLinks(data.links)
                    setServices(data.data)
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

         }
         setLoading(false)
        }
        fetchServices()
    }, [page])

    let onDeleted=(_id)=>{
        if(services.length ===1 && page > 1){
            navigate('/admin/service/?page='+(page-1))
        }else{ setServices(prev => prev.filter(s=>s._id !==_id))}
           
    }
    return (
     <div className="p-4 md:mt-1.5 mt-14 ">
                <div className='flex justify-between items-center mb-4'>
                            <div className='text-2xl font-bold'>Admin Services</div>
                            <div>
                                <Link to="/admin/service/create" className='bg-blue-500 p-2 rounded text-white'> Create </Link>
                            </div>
                          </div>
            <div>

                {loading ? (
        // ✅ Spinner Section
        <div
          role="status"
          className="flex justify-center items-center h-40"
        >
                 <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only">Loading...</span>

        </div>
      ) :!!services.length  ? (services.map(service => (
                    <ServiceCard service={service} key={service._id} onDeleted={onDeleted}/>
                )) ) : <h1>no data</h1>}

            </div>
{!!links && <Pagination links={links} page={page || 1}/>}




        </div>
    )
}

export default adminservices
