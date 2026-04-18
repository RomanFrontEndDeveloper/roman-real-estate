'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '../ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const linkClass =
		'text-[var(--gray)] hover:text-[var(--gold)] transition duration-300 hover:drop-shadow-[0_0_34px_rgba(201,169,110,1)] hover:scale-102';
	const linkClass2 =
		'flex items-center text-[var(--gray)] hover:text-[var(--gold)] transition duration-300 hover:drop-shadow-[0_0_34px_rgba(201,169,110,1)] hover:scale-110';

	return (
		<header className='sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-800'>
			{/* TOP BAR */}
			<div className='max-w-7xl mx-auto px-4 flex items-center justify-between py-4'>
				<Logo />

				{/* DESKTOP MENU */}
				<nav className='hidden sm:flex gap-6 text-sm'>
					<Link className={linkClass2} href='/'>
						Home
					</Link>
					<Link className={linkClass2} href='/properties'>
						Properties
					</Link>
					<Link className={linkClass2} href='/agents'>
						Agents
					</Link>
					<Button
						variant='outline'
						className='flex items-center pl-5 pr-5'
					>
						<Link href='/login'>Login</Link>
					</Button>
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
							className='absolute right-5 top-5 pl-5 pr-5'
						>
							<Link href='/login'>Login</Link>
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};
