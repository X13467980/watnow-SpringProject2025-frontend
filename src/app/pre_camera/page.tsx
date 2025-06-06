'use client';
import React from 'react';
import Header from '@/feature/Header/Header';

export default function PreCameraPage() {
  const handleStartCamera = () => {

    alert('カメラを起動します');
  };

return (
    <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
            <button
                onClick={handleStartCamera}
                className="bg-red-600 text-white text-lg  justify-center font-bold py-4 px-8 rounded-xl hover:bg-red-700 transition"
            >
                カメラを起動する
            </button>
        </div>
    </>
);
}