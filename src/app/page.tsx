'use client';

import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="p-8 text-center min-h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-4xl font-bold">Gymba+R</h1>
      {/* <p className="text-lg text-gray-600">Gymba+R</p> */}

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
  );
}