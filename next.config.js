/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		api: 'http://localhost:4200/api'
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'm.media-amazon.com'
			},
			{
				protocol: 'https',
				hostname: 'content.rozetka.com.ua'
			},
			{
				protocol: 'https',
				hostname: 'content1.rozetka.com.ua'
			},
			{
				protocol: 'https',
				hostname: 'content2.rozetka.com.ua'
			},
			{
				protocol: 'http',
				hostname: 'localhost'
			}
		]
	}
}

module.exports = nextConfig
