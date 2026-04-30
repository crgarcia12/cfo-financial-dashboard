'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  role: string;
  createdAt: string;
}

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/login');
  }

  return (
    <nav className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-3 backdrop-blur">
      <Link href="/" className="text-lg font-semibold text-slate-50">
        UserAuth
      </Link>
      <div className="flex items-center gap-4">
        {loading ? null : user ? (
          <>
            <Link href="/profile" className="text-slate-300 hover:text-slate-50">
              Profile
            </Link>
            {user.role === 'admin' && (
              <Link href="/admin" className="text-slate-300 hover:text-slate-50">
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-slate-300 hover:text-slate-50">
              Login
            </Link>
            <Link href="/register" className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
