'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../public/logo.svg';

export default function WelcomePage() {
  return (
    <>
      <div className="bg-black p-8 text-center min-h-screen flex flex-col justify-center items-center gap-6">
        <Image
          src={logo}
          alt="Gymba+R Logo"
          className="w-64 h-64 object-contain rounded-2xl shadow-lg bg-black"
        />

        <div className="mt-8 flex gap-4">
          <Link href="/signup">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              新規登録
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition">
              ログイン
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}