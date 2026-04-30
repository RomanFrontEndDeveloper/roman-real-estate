import type { NextConfig } from 'next';

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000',
			},
		],
	},
};

export default nextConfig;

// Це файл конфігурації Next.js,
//  і конкретно тут ти налаштовуєш дозвіл
// на завантаження зовнішніх зображень.

// ❗ Чому це потрібно
// У Next.js є захист:
// 👉 він НЕ дозволяє зовнішні картинки за замовчуванням
