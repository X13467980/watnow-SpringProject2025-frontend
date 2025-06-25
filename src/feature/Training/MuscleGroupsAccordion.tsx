'use client';
import React from 'react';
import { useMuscleGroups } from './useMuscleGroups';

const MuscleGroupsAccordion = () => {
  const groups = useMuscleGroups();
  return (
    <div>
      {groups.map((group, index) => (
        <div key={index} className="border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">{group.name}</h2>
          <ul className="list-disc pl-5 mt-2">
            {group.exercises.map((exercise, idx) => (
              <li key={idx} className="text-gray-700">{exercise}</li>
            ))}
          </ul>
        </div>
      ))}
    </div >
  )
}

export { MuscleGroupsAccordion };