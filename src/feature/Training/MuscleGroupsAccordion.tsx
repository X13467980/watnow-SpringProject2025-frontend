'use client';

import { useMuscleGroups } from './useMuscleGroups';
import { FaPlay } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const MuscleGroupsAccordion = () => {
  const groups = useMuscleGroups();
  const router = useRouter();

  const handlePlayClick = (menuId: number) => {
    router.push(`/record/${menuId}`);
  };

  return (
    <div className="bg-[#000000] min-h-screen p-8">
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-2 h-12 bg-[#B31717] rounded-full mr-4"></div>
            <h2 className="text-white text-xl font-bold">{group.name}</h2>
          </div>
          <div className="flex flex-col gap-4">
            {group.exercises.map((exercise, exerciseIndex) => (
              <div
                key={exerciseIndex}
                className="bg-[#B31717] p-4 rounded-xl flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-white">{exercise}</p>
                </div>
                <button
                  onClick={() => handlePlayClick(exerciseIndex + 1)}
                  className="p-2 bg-white/10 hover:bg-white/20 active:scale-90 rounded-full transition duration-200"
                >
                  <FaPlay className="text-white text-xl" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { MuscleGroupsAccordion };