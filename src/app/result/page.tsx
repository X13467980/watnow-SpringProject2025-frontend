'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import Footer from '@/feature/Footer/Footer';

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
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex-1 px-6 pt-6">
        {/* 撮影画像 */}
        {image && (
          <img
            src={image}
            alt="撮影画像"
            className="w-full rounded-lg mb-6 object-cover max-h-64"
          />
        )}

        {/* 器具名 */}
        <h1 className="text-2xl font-bold mb-6">Machine Name:{machine}</h1>

        {/* Trainings */}
        <h2 className="text-lg font-bold mb-2">Trainings:</h2>
        <div className="flex flex-col gap-4">
          {menus.map((menu: any, index: number) => (
            <div
              key={index}
              className="bg-[#B31717] p-4 rounded-xl flex items-center justify-between"
            >
              <div>
                <p className="font-bold">{menu.name}</p>
                <p className="text-sm text-white/80">{menu.part}</p>
              </div>
              <FaPlay className="text-white text-xl" />
            </div>
          ))}
        </div>
      </div>
      
      {/* フッター */}
      <Footer />
    </div>
  );
}