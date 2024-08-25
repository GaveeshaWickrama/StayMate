import React, { useState, useEffect,useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { FaEdit } from 'react-icons/fa';
import profpic from '../../assets/adminprofilepic.png';
import HostProfile from './HostProfile';
import AdminModProfile from './AdminModProfile';
import GuestProfile from './GuestProfile';
import TechnicianProfile from './TechnicianProfile';

const ViewProfile = () => {

    const { token } = useAuth();
    const [profile, setProfile] = useState('null');
    const { id } = useParams();
    console.log("Insideprofile")
    console.log(id)

    const { currentUser, loading } = useAuth();
    if (loading) {
      return <div>Loading...</div>; // Show a loading spinner or message
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const json = response.data;
                    setProfile(json);
                } else {
                        console.error('Failed to fetch profile. Status:', response.status);
                    }
            } catch (error) {
                console.error('Error fetching the profile:', error);
            }
        };

    
        fetchProfile();
    }, [id,token]);

    let ProfileComponent;

    if (profile.role === 'host') {
      ProfileComponent = <HostProfile profile={profile} currentUser={currentUser} id={id} />;
    } else if (profile.role === 'admin' || profile.role === 'moderator') {
      ProfileComponent = <AdminModProfile profile={profile} currentUser={currentUser} id={id} />;
    } else if (profile.role === 'guest'){
      ProfileComponent = <GuestProfile profile={profile} currentUser={currentUser} id={id} />;
    } 
    else if (profile.role === 'technician'){
      ProfileComponent = <TechnicianProfile profile={profile} currentUser={currentUser} id={id} />;
    }




    return ( 
    
      <div className="min-h-screen flex items-center justify-center bg-gray-50"> 
        {ProfileComponent}
      </div>
  );
};
 
export default ViewProfile;