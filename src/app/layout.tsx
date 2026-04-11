import './globals.css';
import { Playfair_Display, Inter } from 'next/font/google';
import { Header } from '@/shared/components/Header';
import { Footer } from '@/shared/components/Footer';
import { Providers } from './providers';

const playfair = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-playfair',
});

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

export const metadata = {
	title: 'RomanRealEstate',
	description: 'Luxury real estate platform',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='uk'>
			<body className={`${playfair.variable} ${inter.variable}`}>
				<Providers>
					<Header />
					<main className='container py-6'>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
