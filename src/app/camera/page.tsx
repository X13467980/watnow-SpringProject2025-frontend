'use client';
import React, { useRef, useState } from 'react';
import Header from '@/feature/Header/Header';
import { useRouter } from 'next/navigation';
import Footer from '@/feature/Footer/Footer';
import Loading from '@/feature/Loading';
import { TrainingMenu, MachineResponse } from '@/types/machine';

import { CiCamera } from 'react-icons/ci';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [streaming, setStreaming] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreaming(true);
      }
    } catch (err) {
      setErrorMessage('カメラを起動できませんでした。許可が必要です。');
      console.error(err);
    }
  };

  const handleTakePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setLoading(true);

    const context = canvasRef.current.getContext('2d');
    if (!context) {
      setLoading(false);
      return;
    }

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    context.drawImage(videoRef.current, 0, 0, width, height);

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) {
        setLoading(false);
        return;
      }

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

    setLoading(true);

    const base64 = await toBase64(file);
    localStorage.setItem('capturedImage', base64);

    await identifyMachine(file);
  };

  const identifyMachine = async (imageFile: Blob | File) => {
    let machine = '不明';
    let menus: TrainingMenu[] = [];

    try {
      const formData = new FormData();
      const filename = imageFile instanceof File ? imageFile.name : 'image.jpg';
      formData.append('image', imageFile, filename);

      const response = await fetch(
        'https://watnow-springproject2025-backend.onrender.com/api/v1/machines/identify',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'サーバーエラー');
      }

      const result: MachineResponse[] = await response.json();
      if (result.length === 0) {
        throw new Error('画像から器具を判別できませんでした。');
      }
      machine = result[0].machine_name || '不明';
      menus = result[0].menus || [];
    } catch (error) {
      console.error('判別失敗:', error);
      setErrorMessage(
        `画像の判別に失敗しました。\nエラー内容: ${error instanceof Error ? error.message : '不明なエラー'}`,
      );
      setLoading(false);
      return;
    }

    const query = new URLSearchParams({
      machine,
      menus: JSON.stringify(menus),
    });

    setLoading(false);
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
      <Loading visible={loading} />
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 p-4 gap-4">
        {!streaming && (
          <>
            <button
              onClick={handleStartCamera}
              className="w-full bg-[#B31717] flex justify-center items-center gap-2 text-lg font-bold py-4 px-6 rounded-xl hover:bg-[#A00000] transition"
            >
              <span>器具を撮影する</span>
              <CiCamera size={32} />
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

        {errorMessage && (
          <div className="text-white font-semibold text-center mt-4 whitespace-pre-line">
            {errorMessage}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
