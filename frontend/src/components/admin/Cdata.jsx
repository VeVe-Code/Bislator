import React from "react";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "../../helpers/axios";

function Cdata({ d, OnDelete}) {
  let DeleteData = async () => {
    try {
      let res = await axios.delete("/api/contactus/" + d._id);
      if (res.status === 200) {
        console.log("Deleted:", d._id);
        OnDelete(d._id)
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-800">{d.name}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{d.phno}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{d.email}</td>
      <td className="px-6 py-4 text-sm text-gray-600 line-clamp-2">{d.msg}</td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(d.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex justify-center space-x-3">
          <button className="text-blue-600 hover:text-blue-800">
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={DeleteData}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Cdata;
