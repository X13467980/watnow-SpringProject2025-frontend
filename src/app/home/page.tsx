import Header from '@/feature/Header/Header';
import { StartTrainingButton } from '@/feature/StartTrainingButton/StartTrainingButton';
import React from 'react';
import Link from 'next/link';
import Footer from '@/feature/Footer/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      {/* メインコンテンツ */}
      <main className="flex-grow flex flex-col justify-center items-center gap-6 p-8 text-center">
        <h1 className="text-2xl font-bold">This is Home🏠</h1>
        {/* 他のコンテンツをここに追加 */}
      </main>

      <StartTrainingButton />
      <Footer />
    </div>
  );
}