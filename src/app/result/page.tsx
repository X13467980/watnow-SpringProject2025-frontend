'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const params = useSearchParams();
  const machine = params.get('machine');
  const menus = JSON.parse(params.get('menus') || '[]');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('capturedImage');
    if (saved) {
      setImage(saved);
      localStorage.removeItem('capturedImage');
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">マシン判定結果</h1>

      {image && (
        <img src={image} alt="撮影画像" className="w-full rounded-lg mb-6" />
      )}

      <p className="text-xl mb-4">マシン名: <strong>{machine}</strong></p>

      <h2 className="text-lg font-semibold mb-2">トレーニングメニュー:</h2>
      <ul className="space-y-2">
        {menus.map((m: any, i: number) => (
          <li key={i} className="bg-gray-800 p-3 rounded-lg">
            <p className="text-base font-bold">{m.name}</p>
            <p className="text-sm">部位: {m.part}</p>
            <p className="text-sm">回数: {m.count}回 × {m.set_count}セット</p>
            <p className="text-sm">重量: {m.weight}kg</p>
          </li>
        ))}
      </ul>
    </div>
  );
}