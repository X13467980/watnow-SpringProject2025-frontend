// components/ActivityCalendar.tsx
'use client';

import React, { useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const ActivityCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());

  // 仮のデータ 後々はAPIから取得する
  const trainingDays = [
    '2025-06-21', '2025-06-22', '2025-06-24', '2025-06-25',
    '2025-06-26', '2025-06-27', '2025-06-28', '2025-06-30',
    '2025-07-01', '2025-07-02', '2025-07-03', '2025-07-04', '2025-07-05',
  ];

  const totalDays = trainingDays.length;

  const streak = useMemo(() => {
    const sorted = [...trainingDays].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    let count = 1;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) count++;
      else break;
    }
    return count;
  }, [trainingDays]);

  return (
    <section className="mb-6">
      <h2 className="text-3xl font-extrabold">Activity</h2>
      <div className="bg-black rounded-lg p-4">
        <Calendar
          value={value}
          onChange={(newDate) => setValue(newDate as Date)}
          className="custom-calendar calendar-dark"
          locale="en-US"
          calendarType="gregory"
        />
        <div className="mt-4 text-lg font-semibold text-white flex justify-between">
          <span>TOTAL: {totalDays} days</span>
          <span>STREAK: {streak} days🔥</span>
        </div>
      </div>
    </section>
  );
};