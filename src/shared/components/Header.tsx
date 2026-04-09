import Link from 'next/link';
import { Logo } from '../ui/Logo';

export const Header = () => {
	const linkClass = 'hover:text-(--gold) transition';

	return (
		<header className='border-b border-gray-800'>
			<div className='max-w-7xl mx-auto px-4 flex items-center justify-between py-4'>
				<Logo />

				<nav className='flex gap-6 text-sm text-gray-300'>
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
