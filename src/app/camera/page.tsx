'use client';
import React, { useRef, useState } from 'react';
import Header from '@/feature/Header/Header';
import { useRouter } from 'next/navigation';
import Footer from '@/feature/Footer/Footer';
import { TrainingMenu, MachineResponse } from '@/types/machine';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [streaming, setStreaming] = useState(false);
  const router = useRouter();

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

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const reader = new FileReader();
      reader.onloadend = async () => {
        localStorage.setItem('capturedImage', reader.result as string);

        await identifyMachine(blob);
      };
      reader.readAsDataURL(blob);
    }, 'image/jpeg');
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await toBase64(file);
    localStorage.setItem('capturedImage', base64);

    await identifyMachine(file);
  };

  const identifyMachine = async (imageFile: Blob | File) => {
    let machine = '不明';
    let menus: TrainingMenu[] = [];

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch('http://localhost:3000/api/v1/machines/identify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('サーバーエラー');

      const result: MachineResponse = await response.json();
      machine = result.machine_name || '不明';
      menus = result.menus || [];
    } catch (error) {
      console.error('判別失敗:', error);
      alert(
        `画像の判別に失敗しました。\nエラー内容: ${error instanceof Error ? error.message : '不明なエラー'}`
      );
    }

    const query = new URLSearchParams({
      machine,
      menus: JSON.stringify(menus),
    });

    router.push(`/result?${query.toString()}`);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 p-4 gap-4">
        {!streaming && (
          <>
            <button
              onClick={handleStartCamera}
              className="w-full bg-[#B31717] flex justify-center items-center gap-2 text-lg font-bold py-4 px-6 rounded-xl hover:bg-[#A00000] transition"
            >
              <span>器具を撮影する</span>
              <img src="/camera.svg" alt="camera" className="w-6 h-6" />
            </button>

            <label className="w-full">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadPhoto}
              />
              <div className="w-full bg-[#B31717] text-white text-lg font-bold py-4 px-6 rounded-xl hover:bg-[#A00000] transition text-center cursor-pointer">
                ギャラリーから画像を選ぶ
              </div>
            </label>
          </>
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

        <canvas ref={canvasRef} className="hidden" />
      </div>
      <Footer />
    </div>
  );
}