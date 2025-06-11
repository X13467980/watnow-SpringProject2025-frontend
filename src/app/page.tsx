'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../public/logo.svg';

export default function WelcomePage() {
  return (
    <>
      <div className="bg-black text-center min-h-screen flex flex-col justify-start items-center gap-6 pt-48">
        <Image
          src={logo}
          alt="Gymba+R Logo"
          className="w-64 h-64 object-contain shadow-lg bg-black"
        />

        <div className="grid gap-4 w-[min(70vw,600px)]">
          <Link href="/login">
            <button className="bg-none border border-white text-white px-6 py-2 rounded-3xl hover:bg-gray-700 transition text-2xl w-full font-bold">
              Log In
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-white px-6 py-2 rounded-3xl hover:bg-blue-700 transition text-2xl w-full font-bold text-red-800">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}