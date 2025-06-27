
'use client';
import React from 'react';
import { useStartTraining } from './useStartTraining';
import { FaPlay } from 'react-icons/fa'; 

const StartTrainingButton = () => {
  const { handleClick } = useStartTraining('/training');

  return (
    <button
      onClick={handleClick}
      className="w-full bg-[#B31717] text-white font-bold text-xl py-4 px-6 flex items-center justify-center gap-3 rounded-t-[2rem]"
    >
      <span className="bg-white text-[#B31717] rounded-full p-2">
        <FaPlay />
      </span>
      <span>Start Training</span>

    </button>
  );
};


export { StartTrainingButton };

