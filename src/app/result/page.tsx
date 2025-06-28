import React from 'react';
import ResultClient from '@/feature/Result/ResultClient';

export default function ResultPage() {
  return (
    <React.Suspense fallback={<div className="text-white">Loading...</div>}>
      <ResultClient />
    </React.Suspense>
  );
}