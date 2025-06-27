import React from 'react';
import Link from 'next/link';
import { CiCamera, CiBoxList, CiHome } from 'react-icons/ci';

export default function Footer() {
  const navItems = [
    { label: 'CAMERA', icon: <CiCamera size={24} />, link: '/camera' },
    { label: 'HOME', icon: <CiHome size={24} />, link: '/home' },
    { label: 'LIST', icon: <CiBoxList size={24} />, link: '/hoge' },
  ];

  return (
    <footer className="h-16 bg-black border-t border-gray-700 flex justify-center items-center">
      <nav className="flex gap-8">
        {navItems.map(({ label, icon, link }) => (
          <Link href={link} key={label} className="block w-20">
            <button className="flex flex-col items-center text-sm text-white w-full">
              <span className="mb-1">{icon}</span>
              {label}
            </button>
          </Link>
        ))}
      </nav>
    </footer>
  );
}
