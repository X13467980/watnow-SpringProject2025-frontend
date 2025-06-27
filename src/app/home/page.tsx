'use client';

import React from 'react';
import Header from '@/feature/Header/Header';
import Footer from '@/feature/Footer/Footer';
import { StartTrainingButton } from '@/feature/StartTrainingButton/StartTrainingButton';
import { ActivityCalendar } from '@/feature/ActivityCalendar/ActivityCalendar';
import { SetList } from '@/feature/SetList/SetList';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      <main className="flex-grow px-6 pt-6">
        <ActivityCalendar />
        <SetList />
      </main>

      <StartTrainingButton />
      <Footer />
    </div>
  );
}