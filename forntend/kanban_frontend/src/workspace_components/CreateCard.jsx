import React, { useState } from 'react'

const CreateCard = ({ onClick }) => {


  return (
    <div className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center w-[260px] h-[150px] cursor-pointer hover:bg-gray-50" onClick={onClick}>
      <div className="text-2xl mb-2">+</div>

      <span className="text-lg font-semibold">
        Create New Board
      </span>




    </div>
  )
}

export default CreateCard