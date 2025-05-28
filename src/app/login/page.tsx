'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // 必要ならトークンをlocalStorageなどに保存
        // localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/home');
      } else {
        setError(data.error || 'ログインに失敗しました');
      }
    } catch (err) {
      setError('通信エラーが発生しました');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">ログイン</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          ログイン
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}