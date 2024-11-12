/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react'; // Tambahkan useRef

function LoginViews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { push, query } = useRouter();
  const formRef = useRef<HTMLFormElement>(null); // Tambahkan ref untuk form

  const callbackUrl: any = query.callbackUrl || '/';
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const target = event.target as HTMLFormElement;

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: target.email.value, // Gunakan target yang sudah di-cast
        password: target.password.value, // Gunakan target yang sudah di-cast
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError('Email or password is incorrect');
      }
    } catch (error: any) {
      setIsLoading(false);
      setError('Email or password is incorrect');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input type="email" id="email" name="email" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input type="password" id="password" name="password" required className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          {isLoading ? 'Memproses...' : 'Login'}
        </button>
        
      </form>
      <button onClick={() => signIn("google", {
          callbackUrl, redirect: false
        })}>singIn with google</button>

      <p className="mt-6 text-center">
        belum punyah akun?{' '}
        <Link href="/auth/register" className="text-red-500 hover:underline">
          register
        </Link>
      </p>
    </div>
  );
}

export default LoginViews;
