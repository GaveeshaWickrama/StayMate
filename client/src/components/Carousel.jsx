import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const prevIndex = (activeIndex - 1 + images.length) % images.length;
  const nextIndex = (activeIndex + 1) % images.length;

  return (
    <div className="relative w-full bg-gray-200" data-carousel="static" >
      <div className="relative flex items-center overflow-hidden">
        <button onClick={handlePrev} className="z-20 p-4 cursor-pointer text-3xl">
          <FaArrowLeft />
        </button>
        <div className="flex w-full justify-center py-6 ">
          <img src={images[prevIndex].url} alt="Previous" className="w-2/6 transform transition-transform duration-500 scale-90 rounded-lg" />
          <img src={images[activeIndex].url} alt="Current" className="w-2/6 transform transition-transform duration-500 scale-109 rounded-lg" />
          <img src={images[nextIndex].url} alt="Next" className="w-2/6 transform transition-transform duration-500 scale-90  rounded-lg" />
        </div>
        <button onClick={handleNext} className="z-20 p-2 cursor-pointer text-3xl">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;

