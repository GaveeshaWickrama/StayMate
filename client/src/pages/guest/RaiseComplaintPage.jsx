import React,{useState} from "react";
import Title from '../../components/common/Title';
import DropDown from '../../components/common/DropDown';
import InputField from '../../components/guest/InputField';
import DescriptionInput from "../../components/guest/DescriptionInput";
import PhotoUpload from "../../components/guest/PhotoUpload";
import Contact from "../../components/guest/Contact";
import Button from "../common/Button";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useSearchParams } from "react-router-dom";



const complaintCategories = [
    'Plumbing issues (leaks, clogged drains)',
    'Electrical problems (power outages, faulty wiring)',
    'Broken or malfunctioning appliances',
    'Structural problems (cracks in walls, damaged doors or windows)',
    'Pest control (insects, rodents)',
    'Safety and Security Concerns',
    'Other',
  ];

const Raisecomplaint = () => {

    const currentUser = useAuth();
    const token = currentUser.token
    const [searchParams] = useSearchParams();
    const reservationId = searchParams.get('reservationId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [photos, setPhotos] = useState([]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('reservationId',reservationId);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        for (let i = 0; i < photos.length; i++) {
            formData.append('photos', photos[i]);
        }
 
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/complaints/raisecomplaint`,
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