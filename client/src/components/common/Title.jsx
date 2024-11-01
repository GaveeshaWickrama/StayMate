import React from 'react'

const Title = ({title}) => {
  return (
    <div className="bg-white py-4">
      <h1 className="text-black text-3xl font-bold px-4 sm:px-10 md:px-20 lg:px-40">{title}</h1>
    </div>
  )
}

export default Title
