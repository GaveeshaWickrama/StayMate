import React,{useState, useEffect} from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";

import Title from '../../components/common/Title';
import DropDown from '../../components/common/DropDown';
import InputField from '../../components/guest/InputField';
import DescriptionInput from "../../components/guest/DescriptionInput";
import PhotoUpload from "../../components/guest/PhotoUpload";
import Contact from "../../components/guest/Contact";
import Button from "../common/Button";
import { useAuth } from "../../context/auth";



const complaintCategories = [
    'Electrical Issues',
    'HVAC',
    'Plumbing Issues',
    'Appliance Repairs',
    'Structural Maintenance',
    'Safety and Security Concerns',
    'Other',
  ];

const Raisecomplaint = () => {

    const currentUser = useAuth();
    const token = currentUser.token

    const location = useLocation();
    const [reservationId, setReservationId] = useState('');


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const reservationId = queryParams.get('reservationId');
        setReservationId(reservationId);
      }, [location.search]);

      
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('reservationId', reservationId);

        for (let i = 0; i < photos.length; i++) {
            formData.append('photos', photos[i]);
        }
 
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/complaints/raiseComplaint?reservationId=${reservationId}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                     'Content-Type': 'multipart/form-data'
                  },
                }
            );
            
            console.log(response);
            if (response.status==200) {
                alert('Complaint submitted successfully');
                // Clear form data
                setTitle('');
                setDescription('');
                setCategory('');
                setPhotos([]);
            } else {
                alert('Failed to submit complaint');
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('An error occurred while submitting your complaint');
        }
        console.log("Button clicked");
    };


    return (
        <div className="min-h-screen pb-90">
            <Title title="Raise a Complaint" />

            <DropDown 
                categories= {complaintCategories} 
                value = {category}
                onChange = {e => setCategory(e.target.value)}
            />

            <InputField 
                label={"Title"}
                placeholder={"Title should not be more than 50 characters"}
                value = {title}
                onChange = {e => setTitle(e.target.value)}
            />

            <DescriptionInput 
                label={"Description"} 
                placeholder={"Brief description about your problem"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            
            <PhotoUpload 
                photos = {photos}
                setPhotos = {setPhotos}
            />

           <div className=" flex flex-col items-center justify-center mt-11">
                <div className="flex flex-col items-center space-y-2 bg-blue-50 p-4 rounded-lg shadow-md">
                    <Button text={"Send"} onClick = {handleSubmit} />
                    <p>Or</p>
                    <Contact />         
                </div>
            </div>
        </div>
    )
}

export default Raisecomplaint;