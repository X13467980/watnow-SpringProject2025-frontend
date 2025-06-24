'use client';

import React from 'react';
import { FaPlay } from 'react-icons/fa';

export const SetList = () => {
  // 仮のデータ 後々はAPIから取得する
  const setLists = [
    { title: 'For Arm 15min' },
    { title: 'For Arm 5min' },
    { title: 'For Leg 10min' },
  ];

  return (
    <section className="mb-6">
      <h2 className="text-3xl font-extrabold mb-2">Playlist</h2>

      <div className="overflow-x-auto whitespace-nowrap pb-2">
        <div className="flex gap-4">
          {setLists.map((item, index) => (
            <div
              key={index}
              className="relative w-40 h-48 bg-black border border-white rounded-xl flex-shrink-0"
            >
              {/* 再生ボタン */}
              <button className="absolute bottom-2 right-2 bg-red-600 rounded-full p-2">
                <FaPlay className="text-white" />
              </button>

              {/* タイトル（下に配置） */}
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