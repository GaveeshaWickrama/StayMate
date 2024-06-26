import React from "react";
import Title from '../../components/common/Title';
import DropDown from '../../components/common/DropDown';
import InputField from '../../components/guest/InputField';
import DescriptionInput from "../../components/guest/DescriptionInput";
import PhotoUpload from "../../components/guest/PhotoUpload";
import Contact from "../../components/guest/Contact";
import Button from "../common/Button";

const complaintCategories = [
    'Electrical Issues',
    'HVAC',
    'Plumbing Issues',
    'Appliance Repairs',
    'Structural Maintenance',
    'Safety and Security Concerns',
    'Other',
  ];

const raisecomplaint = () => {
    return (
        <div className="min-h-screen pb-90">
            <Title title="Raise a Complaint" />
            <DropDown categories= {complaintCategories} />
            <InputField label={"Title"} placeholder={"Title should not be more than 50 characters"}/>
            <DescriptionInput label={"Description"} placeholder={"Brief description about your problem"}/>
            <PhotoUpload />
           <div className=" flex flex-col items-center justify-center mt-11">
                <div className="flex flex-col items-center space-y-2 bg-blue-50 p-4 rounded-lg shadow-md">
                    <Button text={"Send"}/>
                    <p>Or</p>
                    <Contact />         
                </div>
            </div>
        </div>
    )
}

export default raisecomplaint;