'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import Footer from '@/feature/Footer/Footer';
import { TrainingMenu } from '@/types/machine';

export default function ResultClient() {
  const params = useSearchParams();
  const router = useRouter();
  const machine = params.get('machine');
  const menus: TrainingMenu[] = JSON.parse(params.get('menus') || '[]');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('capturedImage');
    if (saved) {
      setImage(saved);
      localStorage.removeItem('capturedImage');
    }
  }, []);

  const handlePlayClick = (menuId: number) => {
    router.push(`/record/${menuId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex-1 px-6 pt-6">
        {image ? (
          <Image
            src={image}
            alt="撮影画像"
            width={800}
            height={256}
            className="w-full rounded-lg mb-6 object-cover max-h-64"
            style={{ objectFit: 'cover', width: '100%', height: 'auto', maxHeight: '16rem' }}
            priority
          />
        ) : (
          <div className="text-center text-white/60 italic mb-6">
            画像が見つかりませんでした
          </div>
        )}

        <h1 className="text-2xl font-bold mb-6">Machine Name: {machine}</h1>

        <h2 className="text-lg font-bold mb-2">Trainings:</h2>
        <div className="flex flex-col gap-4">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="bg-[#B31717] p-4 rounded-xl flex items-center justify-between"
            >
              <div>
                <p className="font-bold">{menu.name}</p>
                <p className="text-sm text-white/80">{menu.part}</p>
              </div>
              <button
                onClick={() => handlePlayClick(menu.id)}
                className="p-2 bg-white/10 hover:bg-white/20 active:scale-90 rounded-full transition duration-200"
              >
                <FaPlay className="text-white text-xl" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}