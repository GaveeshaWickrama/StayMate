import React from 'react';

const Button = ({ text, className,onClick }) => {
  return (
    <button className={`bg-blue-900 text-white font-bold py-2 px-10 rounded-md max-w-xs ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
