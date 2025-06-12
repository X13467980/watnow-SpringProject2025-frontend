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

  const handleTakePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    context.drawImage(videoRef.current, 0, 0, width, height);

    // canvas → Blob に変換
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append('image', blob, 'photo.jpg');

      try {
        const response = await fetch('http://localhost:3000/api/v1/machines/identify', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('サーバーエラー');
        }

        const result = await response.json();
        alert(`マシン: ${result.machine_name}\nメニュー:\n${result.menus.map((m: any) => `・${m.name} (${m.part})`).join('\n')}`);
      } catch (error) {
        console.error('判別失敗:', error);
        alert('マシンの判定に失敗しました');
      }
    }, 'image/jpeg');
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 gap-4">
        {!streaming && (

          <button
            onClick={handleStartCamera}
            className="w-full bg-[#B31717] flex justify-between items-center text-lg font-bold py-4 px-6 rounded-xl hover:bg-[#A00000] transition"
          >
            <span>器具の検索</span>
            <img src="/camera.svg" alt="camera" className="w-6 h-6" />
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
            className="bg-[#B31717] text-white text-lg font-bold py-2 px-6 rounded hover:bg-[#A00000] transition"
          >
            撮影する
          </button>
        )}

        <canvas ref={canvasRef} className="mt-4 rounded" />
      </div>
    </>
  );
}