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
      localStorage.removeItem('capturedImage'); // 一度だけ使うなら削除
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">判定結果</h1>
      {image && <img src={image} alt="撮影画像" className="w-full rounded-lg mb-4" />}
      <p className="text-xl">マシン名: <strong>{machine}</strong></p>
      <ul className="mt-2">
        {menus.map((m: any, i: number) => (
          <li key={i}>・{m.name}（{m.part}）</li>
        ))}
      </ul>
    </div>
  );
}