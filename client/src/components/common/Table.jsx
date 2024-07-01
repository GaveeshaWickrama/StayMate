import React from 'react'



export default function table() {
  return (
    <div>
        <div className="overflow-auto rounded-lg shadow md:block"> <table>
            <thead className="bg-gray-50"></thead>
            <tr>
           
            <th className="p-3 text-sm font-semifold text-left w-20 whitespace-nowrap">Task ID</th>
            <th className="p-3 text-sm font-semifold text-left whitespace-nowrap">Description</th>
            <th className="p-3 text-sm font-semifold text-left whitespace-nowrap">Status</th>
            <th className="p-3 text-sm font-semifold text-left whitespace-nowrap">Action</th>
            </tr>
            <tbody className="divide-y divide-gray-00">
            <tr className="bg-gray-50">
                  <td className="p-3 text-sm text-gray-700 w-20 whitespace-nowrap">raveesha</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">raveesha</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">                    
                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">cancelled</span>
                  </td>
                  <td className="p-3 text-sm text-gray-700">raveesha</td>
              </tr>
            <tr className="bg-white">
                  <td className="p-3 text-sm text-gray-700 w-20 whitespace-nowrap">raveesha</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">raveesha</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">shipped</span>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap"><a href="#" className="font-bold text-blue-500 hover:underline"> 1 </a></td>
              </tr>
            </tbody>
             
        </table></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            <div className="bg-white p-4 space-y-3 rounded-lg shadow">
                <div className="flex items-center space-x-2 text-sm">
                    <div>
                        <a href="#" className="text-blue-500 font-bold hover:underline"></a>
                    </div>
                    <div className="text-gray-500">Order no</div>
                    <div><span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">fef</span></div>
                    <div className="text-sm text-gray-700"> hehehehehhhe</div>
                    <div className="text-sm font-medium text-black"> hehehehehhhe</div>
                </div>
                <div>description</div>
                <div>description</div>
                <div>description</div>
                <div>description</div>
            </div>
            <div className="bg-white p-4 space-y-3 rounded-lg shadow">
                <div className="flex items-center space-x-2 text-sm">
                    <div>
                        <a href="#" className="text-blue-500 font-bold hover:underline"></a>
                    </div>
                    <div className="text-gray-500">Order no</div>
                    <div><span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">fef</span></div>
                    <div className="text-sm text-gray-700"> hehehehehhhe</div>
                    <div className="text-sm font-medium text-black"> hehehehehhhe</div>
                </div>
                <div>description</div>
                <div>description</div>
                <div>description</div>
                <div>description</div>
            </div>
        </div>
       

      
    </div>
  )
}
