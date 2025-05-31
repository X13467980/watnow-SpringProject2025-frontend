"use client";
import React from "react"
import { useStartTraining } from "./useStartTraining";

const StartTrainingButton = () => {
  const { handleClick } = useStartTraining("/training");
  return (
    <div>
      <button onClick={handleClick}>
        StartTrainingButton
      </button>
    </div>
  )
}

export { StartTrainingButton }; 