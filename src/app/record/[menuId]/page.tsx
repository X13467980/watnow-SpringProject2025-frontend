'use client';
import Header from '@/feature/Header/Header';
import Footer from '@/feature/Footer/Footer';
import RecordCard from '@/feature/TrainingRecord/RecordCard';
import SaveCard from '@/feature/SaveCard/SaveCard';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MenuRecordProps } from '@/feature/TrainingRecord/RecordCard';

type MenuIdProps = {
  params: { menuId: string };
};

export default function Page({ params }: MenuIdProps) {
  const { menuId } = params;
  const router = useRouter();
  const [records, setRecords] = useState<MenuRecordProps[]>([
    {
      menuId: '',
      weight: '',
      reps: '',
      memo: '',
      index: 0,
      onChange: () => {},
    },
    {
      menuId: '',
      weight: '',
      reps: '',
      memo: '',
      index: 1,
      onChange: () => {},
    },
    {
      menuId: '',
      weight: '',
      reps: '',
      memo: '',
      index: 2,
      onChange: () => {},
    },
    {
      menuId: '',
      weight: '',
      reps: '',
      memo: '',
      index: 3,
      onChange: () => {},
    },
  ]);
  const [menuName, setMenuName] = useState('');
  const [timer, setTimer] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/menus/${menuId}`)
      .then((res) => res.json())
      .then((data) => setMenuName(data.name));
  }, [menuId]);

  // タイマー動作
  useEffect(() => {
    if (isRunning && timer > 0) {
      timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsRunning(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isRunning, timer]);

  const handleChange = (
    idx: number,
    weight: string,
    reps: string,
    memo?: string
  ) => {
    setRecords((prev) =>
      prev.map((rec, i) =>
        i === idx ? { ...rec, weight, reps, memo: memo ?? '' } : rec
      )
    );
  };

  // Saveボタン押下時
  const handleSave = async () => {
    // weightとrepsが両方埋まっているカードだけ抽出
    const filledRecords = records.filter((rec) => rec.weight && rec.reps);

    if (filledRecords.length === 0) {
      alert('記録を入力してください');
      return;
    }

    try {
      await Promise.all(
        filledRecords.map((rec) =>
          fetch('http://localhost:3000/api/v1/users_trainings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              users_training: {
                // user_idは送らない
                menu_id: menuId,
                weight: rec.weight,
                reps: rec.reps,
                memo: rec.memo,
                set_count: rec.index ?? 1,
                training_date: new Date().toISOString(),
              },
            }),
          })
        )
      );
      router.push('/home');
    } catch {
      alert('記録の保存に失敗しました');
    }
  };

  // タイマー表示用
  const min = String(Math.floor(timer / 60)).padStart(2, '0');
  const sec = String(timer % 60).padStart(2, '0');

  return (
    <div className={'bg-black min-h-screen flex flex-col training-page'}>
      <Header />
      <div className="flex-1 bg-[#a32d23] rounded-t-3xl pb-8 px-2 pt-4 flex flex-col">
        {/* トレーニング名 */}
        <div className="flex items-center mb-6 justify-center relative">
          <button
            className="text-white text-3xl font-bold absolute left-0 active:opacity-70"
            onClick={() => router.back()}
            aria-label="前のページに戻る"
            type="button"
          >
            ▼
          </button>
          <span className="text-white text-2xl font-bold">{menuName}</span>
        </div>
        {/* Timer */}
        <div className="mb-6">
          <div className="text-white font-bold text-xl mb-2">Timer</div>
          <div className="border-t-2 border-white mb-2"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-4xl font-extrabold tracking-widest">
              {min}:{sec}
            </span>
            <button
              className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center active:opacity-70"
              onClick={() => setIsRunning((prev) => !prev)}
            >
              <span className="text-white text-2xl">
                {isRunning ? '⏸' : '▶'}
              </span>
            </button>
          </div>
          <div className="border-t-2 border-white"></div>
        </div>
        {/* Record */}
        <div className="text-white font-bold text-xl mb-2">Record</div>
        <div
          className="flex flex-col gap-2 overflow-y-auto"
          style={{ height: '260px' }} // 4つのカードがぴったり見える高さに
        >
          {records.map((rec, idx) => (
            <RecordCard
              key={idx}
              index={idx}
              menuId={rec.menuId}
              weight={rec.weight}
              reps={rec.reps}
              memo={rec.memo}
              onChange={(w, r, m) => handleChange(idx, w, r, m)}
            />
          ))}
        </div>
        {/* Saveボタン */}
        <div className="mt-8 flex-shrink-0">
          <SaveCard onClick={handleSave} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
