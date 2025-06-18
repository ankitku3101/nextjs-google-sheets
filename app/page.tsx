'use client'

import { useState } from "react";

export default function Home() {
  const [regdNo, setRegdNo] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);
    setStatus(null);

    const res = await fetch('/api/check-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ regdNo }),
    });

    const data = await res.json();
    setStatus(data.status);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 space-y-4 text-black">
        <h1 className="text-2xl font-bold text-center">Certificate Status Checker</h1>
        <input
          value={regdNo}
          onChange={(e) => setRegdNo(e.target.value)}
          placeholder="Enter Registration No"
          className="w-full border px-4 py-2 rounded"
        />
        <button
          onClick={check}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          {loading ? 'Checking...' : 'Check Status'}
        </button>
        {status && (
          <div className="text-center font-medium">
            {status === 'issued' && <p className="text-green-600">✅ Certificate Issued</p>}
            {status === 'not_issued' && <p className="text-red-500">❌ Not Issued Yet</p>}
            {status === 'not_found' && <p className="text-gray-500">Regd No not found</p>}
          </div>
        )}
      </div>
    </main>
  );
}
