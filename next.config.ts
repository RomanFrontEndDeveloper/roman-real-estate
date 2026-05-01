import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			// 🔹 локально
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000',
			},
			// 🔹 продакшен (Render)
			{
				protocol: 'https',
				hostname: 'roman-real-estate.onrender.com',
			},
		],
	},
};

export default nextConfig;
