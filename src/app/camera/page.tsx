'use client';
import React, { useRef, useState } from 'react';
import Header from '@/feature/Header/Header';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [streaming, setStreaming] = useState(false);

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreaming(true);
      }
    } catch (err) {
      alert('カメラを起動できませんでした。許可が必要です。');
      console.error(err);
    }
  };

  const handleTakePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    context.drawImage(videoRef.current, 0, 0, width, height);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 gap-4">
        {!streaming && (
          <button
            onClick={handleStartCamera}
            className="bg-[#B31717] text-white text-lg font-bold py-4 px-8 rounded-xl hover:bg-[#A00000] transition"
          >
            カメラを起動する
          </button>
        )}

        <video
          ref={videoRef}
          className={`${streaming ? 'block' : 'hidden'} rounded-lg`}
          autoPlay
        ></video>

        {streaming && (
          <button
            onClick={handleTakePhoto}
            className="bg-green-600 text-white text-lg font-bold py-2 px-6 rounded hover:bg-green-700 transition"
          >
            撮影する📸
          </button>
        )}

        <canvas ref={canvasRef} className="mt-4 border border-white rounded" />
      </div>
    </>
  );
}