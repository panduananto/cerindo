import { fileURLToPath } from 'node:url'

import createJiti from 'jiti'

const jiti = createJiti(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.googleusercontent.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'fastly.picsum.photos',
				port: '',
			},
		],
	},
}

export default nextConfig
