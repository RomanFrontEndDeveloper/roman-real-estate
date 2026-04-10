import Link from 'next/link';
import { Logo } from '../ui/Logo';

export const Header = () => {
	const linkClass =
		'text-[var(--gray)] hover:text-[var(--gold)] transition duration-300 hover:drop-shadow-[0_0_14px_rgba(201,169,110,1)] hover:scale-110';
	return (
		<header className='sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-800'>
			<div className='max-w-7xl mx-auto px-4 flex items-center justify-between py-4'>
				<Logo />

				<nav className='flex gap-6 text-sm'>
					<Link className={linkClass} href='/'>
						Home
					</Link>
					<Link className={linkClass} href='/properties'>
						Properties
					</Link>
					<Link className={linkClass} href='/agents'>
						Agents
					</Link>
				</nav>
			</div>
		</header>
	);
};
