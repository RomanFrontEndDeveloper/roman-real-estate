import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			// 🔹 локально (як було)
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000',
			},
			// 🔹 старий бекенд (можеш залишити)
			{
				protocol: 'https',
				hostname: 'roman-real-estate.onrender.com',
			},
			// 🔥 НОВЕ — Cloudinary
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},
};

export default nextConfig;
