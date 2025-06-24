import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const navItems = [
    { label: 'CAMERA', icon: 'camera.svg', link: '/camera' },
    { label: 'HOME', icon: 'home.svg', link: '/home' },
    { label: 'LIST', icon: 'menu.svg', link: '/list' },
  ];

  return (
    <footer className="h-16 bg-black border-t border-gray-700 flex justify-around items-center">
      {navItems.map(({ label, icon, link }) => (
        <Link href={link} key={label} className="flex flex-col items-center text-sm text-white">
          <button className="flex flex-col items-center text-sm text-white">
            <img src={icon} alt={label} className="w-6 h-6 mb-1" />
            {label}
          </button>
        </Link>
      ))}
    </footer>
  );
}