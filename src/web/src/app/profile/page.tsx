'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  role: string;
  createdAt: string;
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr));
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  function fetchProfile() {
    setLoading(true);
    setError(false);
    fetch('/api/auth/me')
      .then((res) => {
        if (res.status === 401) {
          router.push('/login');
          return null;
        }
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then((data) => {
        if (data) setUser(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center">
        <p className="text-slate-300">Loading profile...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[80vh] flex-col items-center justify-center gap-4">
        <p className="text-red-600">Failed to load profile. Please try again.</p>
        <button
          onClick={fetchProfile}
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-800 bg-slate-900/85 p-8 text-center shadow-xl shadow-black/10">
        <h1 className="text-2xl font-bold text-slate-50">{user.username}</h1>
        <span data-testid="role-badge" className="inline-block rounded-full border border-blue-500/20 bg-blue-500/15 px-3 py-1 text-sm font-medium text-blue-200">
          {user.role}
        </span>
        <p className="text-slate-300">
          Member since {formatDate(user.createdAt)}
        </p>
        <p className="text-sm text-slate-500">Use the Logout button in the navigation bar to sign out.</p>
      </div>
    </main>
  );
}
