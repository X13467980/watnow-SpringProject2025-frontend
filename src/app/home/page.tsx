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
        <section className="mb-6">
            <h2 className="text-3xl font-extrabold mb-4">Activity</h2>

          <div className="bg-black rounded-lg p-4">
            <Calendar
              value={value}
              onChange={(newDate) => setValue(newDate as Date)}
              className="custom-calendar"
              locale="en-US"
              calendarType="gregory"
            />
          </div>
        </section>
      </main>

      <StartTrainingButton />
      <Footer />
    </div>
  );
}