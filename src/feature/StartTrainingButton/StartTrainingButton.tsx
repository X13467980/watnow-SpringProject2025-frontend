"use client";
import React from "react";
import { useStartTraining } from "./useStartTraining";

const StartTrainingButton = () => {
  const { handleClick } = useStartTraining("/record/1");
  return (
    <button onClick={handleClick} className="w-full">
      StartTraining
    </button>
  );
};

export { StartTrainingButton };
