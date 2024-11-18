import React, {useEffect, useState} from "react";
import { FaStar } from "react-icons/fa";
import {useParams} from "react-router-dom";



export const StarRating = ({maxStars = 5, onRatingChange}) => {

const [rating, setRating] = useState(0); 
const [hover, setHover] = useState(0);


    const handleRatingClick = async(newRating) => {
      setRating(newRating);
        if(onRatingChange){
            onRatingChange(newRating); //notify the parent component
        }
    }


    console.log("this is the rating you published:",rating);
  return (
    <div className="flex flex-col items-center">
            <div className="flex">
                {[...Array(maxStars)].map((_,index)=> {
                    const starValue = index+1;

return(
    <FaStar
    key= {index}
    size={24}
    className={`cursor-pointer transition-colors ${starValue <= (hover || rating) ? "text-yellow-500" : "text-gray-300"}`}
    onClick={()=> handleRatingClick(starValue)} //show hover effect
    onMouseEnter={()=> setHover(starValue)} //show hoever effect
    onMouseLeave={()=> setHover(0)} //reset hover on mouse leave
    />
);

                }) }
            </div>

{/* <button>
    Done
</button> */}
    </div>
  )
}
