'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '@/feature/Header/Header';
import { StartTrainingButton } from '@/feature/StartTrainingButton/StartTrainingButton';
import Footer from '@/feature/Footer/Footer';

export default function HomePage() {
  const [value, setValue] = useState<Date>(new Date());

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      <main className="flex-grow px-6 pt-6">
        {/* Activity セクション */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Activity</h2>
          <div className="bg-gray-800 border border-white rounded-lg p-4 h-48 mb-4" />

          {/* カレンダー */}
          <div className="bg-gray-800 border border-white rounded-lg p-4">
            <Calendar
              value={value}
              onChange={(newDate) => setValue(newDate as Date)}
              className="text-black rounded"
            />
          </div>
        </section>

        {/* Playlist セクション（今後追加可能） */}
      </main>

      <StartTrainingButton />
      <Footer />
    </div>
  );
}