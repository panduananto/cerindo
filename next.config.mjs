import './src/env.mjs'

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
		],
	},
}

export default nextConfig
