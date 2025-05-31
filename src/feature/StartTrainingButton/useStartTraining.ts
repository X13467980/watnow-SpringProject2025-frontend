'use client';

import { useRouter } from 'next/navigation';

export const useStartTraining = (href: string) => {
  const router = useRouter();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return { handleClick };
};
