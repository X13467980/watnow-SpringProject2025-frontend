'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaPlay } from 'react-icons/fa';

export const SetList = () => {
  const router = useRouter();

  const setLists = [
    { title: 'For Arm 15min' },
    { title: 'For Arm 5min' },
    { title: 'For Leg 10min' },
    { title: 'For Back 20min' },
    { title: 'For Chest 30min' },
    { title: 'For Shoulder 25min' },
    { title: 'For Core 15min' },
    { title: 'For Cardio 40min' },
    { title: 'For Full Body 60min' },
    { title: 'For Flexibility 15min' },
    { title: 'For Endurance 50min' },
    { title: 'For Strength 45min' },
    { title: 'For Speed 30min' },
    { title: 'For Agility 20min' },
    { title: 'For Balance 15min' },
  ];

  const handlePlayClick = (title: string) => {
    router.push(`/list?menu=${encodeURIComponent(title)}`);
  };

  return (
    <section className="mb-6">
      <h2 className="text-3xl font-extrabold mb-2">Playlist</h2>

      <div className="overflow-x-auto whitespace-nowrap pb-2">
        <div className="flex gap-4">
          {setLists.map((item) => (
            <div
              key={item.title}
              className="relative w-40 h-48 bg-black border border-white rounded-xl flex-shrink-0"
            >
              <button
                onClick={() => handlePlayClick(item.title)}
                className="absolute bottom-2 right-2 bg-[#B31717] rounded-full p-2"
              >
                <FaPlay className="text-white" />
              </button>

              <div className="absolute bottom-0 left-2 text-sm font-bold text-white">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
