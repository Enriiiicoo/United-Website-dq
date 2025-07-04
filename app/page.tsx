// app/whitelist/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';

export default function WhitelistPage() {
  const [form, setForm] = useState({
    discordId: '',
    irlName: '',
    irlAge: '',
    ingameName: '',
    ingameAge: '',
    experience: '',
    serial: 'N/A'
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/whitelist', form);
      if (data.success) {
        setMessage('✅ Application submitted successfully!');
      } else {
        setMessage('❌ ' + (data.error || 'Unknown error.'));
      }
    } catch (error: any) {
      setMessage('❌ ' + (error.response?.data?.error || 'Submission failed.'));
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <h1 className="text-4xl font-bold mb-6 text-white">Whitelist Application</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-xl space-y-4 max-w-md w-full">
        <input name="discordId" placeholder="Discord ID" onChange={handleChange} className="input" required />
        <input name="irlName" placeholder="IRL Name" onChange={handleChange} className="input" required />
        <input name="irlAge" placeholder="IRL Age" onChange={handleChange} className="input" required />
        <input name="ingameName" placeholder="In-game Name" onChange={handleChange} className="input" required />
        <input name="ingameAge" placeholder="In-game Age" onChange={handleChange} className="input" required />
        <textarea name="experience" placeholder="Roleplay Experience" onChange={handleChange} className="input h-24" required />

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Submit</button>

        {message && <div className="mt-2 text-center text-sm text-gray-700">{message}</div>}
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
      `}</style>
    </main>
  );
}
