import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';

// components
import  PendingPropertyCard from '../../components/moderator/PendingPropertyCard'
import  SearchProperty from '../../components/moderator/SearchProperty'

const ViewNewProperties = () => {

    const { token } = useAuth();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/moderator/viewNewProperties`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    const json = response.data;
                    setProperties(json);
                } else {
                        console.error('Failed to fetch properties. Status:', response.status);
                }

            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [token]);

    return (

        <div className="container mx-auto p-4">
            <SearchProperty />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15rem]">
                {properties && properties.length > 0 ? (
                    properties.map(property => (
                        <PendingPropertyCard key={property._id} property={property} />
                    ))
                ) : (
                    <h1>No Pending Properties</h1>
                )}
               
            </div>
        </div>

    );
};
                
export default ViewNewProperties;