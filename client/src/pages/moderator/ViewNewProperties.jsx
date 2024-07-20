import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import logo from '../../../../uploads/1720194545293-img1.jpg.webp';
//  D:\Universtiy Academic\3rd Year - 1st Sem\SCS3214  - Group Project 2\Project\StayMate\server\

const ViewNewProperties = () => {
    const [properties, setProperties] = useState([]);

    // useEffect(() => {
    //     // Fetch properties from the PropertyVerifiedModel
    //     const fetchProperties = async () => {
    //         try {
    //             const response = await axios.get('/api/properties/verified');
    //             setProperties(response.data);
    //         } catch (error) {
    //             console.error('Error fetching properties:', error);
    //         }
    //     };

    //     fetchProperties();
    // }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* {properties.map((property) => ( */}
                    <div 
                    // key={property._id} 
                    className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img 
                            className="w-full h-48 object-cover"
                            src= 'http://localhost:3000/uploads/1719842871939-img3.jpg'
                            // src={property.images[0].url} 
                            // alt={property.title} 
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">
                                carnivourius House
                                {/* {property.title} */}
                                </h3>
                            <p className="text-gray-600">
                                Kaluthara Western
                                {/* {property.location.district}, {property.location.province} */}
                                </p>
                            <p className="text-gray-600">
                                12,Colombo
                                {/* {property.location.address} */}
                                </p>
                            <p className="text-gray-600">
                                12/02/20234
                                {/* {property.created_at} */}
                                </p>
                            <p className="mt-2">
                                {/* Payment: <span className="text-yellow-600">{property.status}</span> */}
                            </p>
                            <p className="text-xl font-bold mt-2">RS 
                                30000
                                {/* {property.price_per_night} */}
                                </p>
                            <div className="flex justify-between mt-4">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Chat</button>
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">View Complaints</button>
                            </div>
                        </div>
                    </div>
                {/* ))
                } */}
            </div>
        </div>
    );
};
                
export default ViewNewProperties;
