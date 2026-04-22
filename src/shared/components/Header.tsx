'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '../ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const linkClass =
		'text-[var(--gray)] hover:text-[var(--gold)] transition duration-300 hover:drop-shadow-[0_0_34px_rgba(201,169,110,1)] hover:scale-102';
	const linkClass2 =
		'flex items-center text-[var(--gray)] hover:text-[var(--gold)] transition duration-300 hover:drop-shadow-[0_0_34px_rgba(201,169,110,1)] hover:scale-110';

	return (
		<header className='sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-800'>
			{/* TOP BAR */}
			<div className='max-w-7xl mx-auto px-4 flex items-center justify-between py-4'>
				<Logo />
				<Button
					type='button'
					className='sm:hidden'
					onClick={() => router.back()}
				>
					← Back
				</Button>

				{/* DESKTOP MENU */}
				<nav className='hidden sm:flex items-center gap-4 text-sm'>
					<Link className={linkClass2} href='/'>
						Home
					</Link>
					<Link className={linkClass2} href='/properties'>
						Properties
					</Link>
					<Link className={linkClass2} href='/agents'>
						Agents
					</Link>
					{/* 🔙 Кнопка назад */}
					<Button
						type='button'
						onClick={() => router.back()}
						className='flex items-center h-[37px] w-[85px] '
					>
						← Back
					</Button>
					<div className='flex flex-col items-center gap-[8px]'>
						<Button
							onClick={() => setIsOpen(false)}
							variant='outline'
							className='w-[80px] flex justify-center'
						>
							<Link href='/register'>Register</Link>
						</Button>

						<Button
							variant='outline'
							className='w-[80px] flex justify-center'
						>
							<Link href='/login'>Login</Link>
						</Button>
					</div>
				</nav>

				{/* BURGER */}
				<button
					className='sm:hidden text-white text-2xl z-50'
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? '✕' : '☰'}
				</button>
			</div>

			{/* MOBILE MENU (OVERLAY) */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className='absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-gray-800 sm:hidden z-40'
					>
						<nav className='flex flex-col gap-5 p-3 text-lg'>
							<Link
								className={linkClass}
								href='/'
								onClick={() => setIsOpen(false)}
							>
								Home
							</Link>
							<Link
								className={linkClass}
								href='/properties'
								onClick={() => setIsOpen(false)}
							>
								Properties
							</Link>
							<Link
								className={linkClass}
								href='/agents'
								onClick={() => setIsOpen(false)}
							>
								Agents
							</Link>
						</nav>

						<Button
							onClick={() => setIsOpen(false)}
							variant='outline'
							className='absolute right-5 top-2 pl-5 pr-5 w-[100px]'
						>
							<Link href='/register'>Register</Link>
						</Button>
						<Button
							onClick={() => setIsOpen(false)}
							variant='outline'
							className='absolute right-5 top-14 pl-8 pr-7 w-[100px]'
						>
							<Link href='/login'>Login</Link>
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};
