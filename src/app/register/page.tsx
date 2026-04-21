'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch('http://localhost:5000/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || 'Register failed');
			}

			// 👉 після реєстрації — на логін
			router.push('/login');
		} catch (error) {
			console.error('Register error:', error);
		}
	};

	return (
		<div className='flex justify-center items-center min-h-screen'>
			<div className='bg-[var(--secondary)] p-8 rounded-xl shadow-lg w-full max-w-md'>
				<h1 className='text-2xl mb-6 text-center text-[var(--gold)]'>
					Register
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

					<Button type='submit' className='w-[250px] sm:w-[200px]'>
						Register
					</Button>
				</form>
			</div>
		</div>
	);
}
