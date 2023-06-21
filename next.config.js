/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		api: 'http://localhost:4200/api'
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost'
			}
		]
	}
}

module.exports = nextConfig
