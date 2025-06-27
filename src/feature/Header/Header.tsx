// components/Header.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-white px-6 py-4 flex items-center justify-center shadow-md">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="GYMba+R Logo" width={150} height={40} />
      </div>
    </header>
  );
}
