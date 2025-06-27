'use client';
import { MuscleGroupsAccordion } from '@/feature/Training/MuscleGroupsAccordion';
import Footer from '@/feature/Footer/Footer';
import Header from '@/feature/Header/Header';
import React from 'react';

const page = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="pt-20 pb-20">
        <MuscleGroupsAccordion />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Footer />
      </div>
    </div>
  );
};

export default page;
