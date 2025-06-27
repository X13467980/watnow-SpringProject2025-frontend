'use client';
import { useMuscleGroups } from './useMuscleGroups';

const MuscleGroupsAccordion = () => {
  const groups = useMuscleGroups();

  return (
    <div className="bg-[#000000] min-h-screen p-8">
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-[#B31717] rounded-full mr-4"></div>
            <h2 className="text-white text-xl font-bold">{group.name}</h2>
          </div>
          <div className="space-y-4">
            {group.exercises.map((exercise, exerciseIndex) => (
              <div
                key={exerciseIndex}
                className="flex items-center backdrop-blur-sm border-4 border-white rounded-full bg-[#B31717]"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-[#B31717] font-bold text-lg">
                    {exerciseIndex + 1}
                  </span>
                </div>
                <span className="text-white font-medium text-lg">
                  {exercise}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { MuscleGroupsAccordion };
