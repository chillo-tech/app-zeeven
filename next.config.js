/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    SERVICE_KEY: process.env.SERVICE_KEY,
    SERVICE_ID: process.env.SERVICE_ID,
  },
  async redirects() {
    return [
      {
        source: '/create-campain',
        destination: '/new-campain',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://api.zeeven.chillo.fr/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
