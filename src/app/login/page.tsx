'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json', //- відправляю JSON
					},
					body: JSON.stringify({ email, password }), //це попадає на бекенді - у controller:
				},
			);

			const data = await res.json(); //витягує дані з відповіді сервера у форматі JSON після fetch

			// 🔐 збереження токена
			if (data.token) {
				localStorage.setItem('token', data.token);

				router.push('/'); // 🔥 переходимо на головну
			}

			if (!res.ok) {
				throw new Error(data.message || 'Login failed');
			}
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<div className='flex justify-center items-center min-h-screen'>
			<div className='bg-[var(--secondary)] p-8 rounded-xl shadow-lg w-full max-w-md'>
				<h1 className='text-2xl mb-6 text-center text-[var(--gold)]'>
					Login
				</h1>

				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-4 items-center'
				>
					<Input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button type='submit' className=' w-[250px] sm:w-[200px]'>
						Login
					</Button>
				</form>
			</div>
		</div>
	);
}
