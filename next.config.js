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
			}
		]
	}
}

module.exports = nextConfig
