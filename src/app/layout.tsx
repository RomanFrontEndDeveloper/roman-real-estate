import './globals.css';

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
			<body>{children}</body>
		</html>
	);
}
