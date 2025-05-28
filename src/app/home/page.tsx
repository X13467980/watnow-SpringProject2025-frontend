import Header from '@/components/Header';
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

      {/* フッター */}
      <footer className="h-16 bg-black border-t border-gray-700 flex justify-around items-center">
        {["SNS", "HOME", "LIST"].map((label) => (
          <button key={label} className="flex flex-col items-center text-sm">
            <span className="text-lg">◎</span> {/* ← アイコンを追加する場合 */}
            {label}
          </button>
        ))}
      </footer>
    </div>
  );
}