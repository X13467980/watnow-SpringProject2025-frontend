'use client';
import React from 'react'
import { useStartTraining } from './useStartTraining';

const StartTrainingButton = () => {
  const { handleClick } = useStartTraining('/training');
  return (
    <div>
      <button onClick={handleClick} className='fixed bottom-4'>
        StartTraining
      </button>
    </div>
  )
}

export { StartTrainingButton }; 