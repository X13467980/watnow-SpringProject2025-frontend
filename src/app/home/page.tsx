import Header from '@/components/Header';
import { StartTrainingButton } from '@/feature/StartTrainingButton/StartTrainingButton';
import React from 'react';

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
      {/* フッター */}
      <footer className="h-16 bg-black border-t border-gray-700 flex justify-around items-center">
        {[
          { label: 'SNS', icon: 'search.svg' },
          { label: 'HOME', icon: 'home.svg' },
          { label: 'LIST', icon: 'menu.svg' },
        ].map(({ label, icon }) => (
          <button key={label} className="flex flex-col items-center text-sm text-white">
            <img src={icon} alt={label} className="w-6 h-6 mb-1" />
            {label}
          </button>
        ))}
      </footer>
    </div>
  );
}