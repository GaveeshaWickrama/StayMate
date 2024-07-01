// Minimal Example: App.js
import React from 'react';
import { LinearProgress } from '@mui/material';


import Title from '../../components/common/Title';
import DropDown from '../../components/common/DropDown';
import InputField from '../../components/guest/InputField';
import DescriptionInput from "../../components/guest/DescriptionInput";
import PhotoUpload from "../../components/guest/PhotoUpload";
import Contact from "../../components/guest/Contact";
import Button from "../common/Button";



export default function completion() {
  return (
    <div>
        <Title title="Proof of submission" />

        <div> 
        </div>
        <DescriptionInput label={"Please Mention Any Special Remarks"} />

        <PhotoUpload title={"Upload photos"} />

      <Button text={"submit"}/>
    </div>
  )
}

