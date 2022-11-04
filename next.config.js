/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
        destination: `${process.env.API_URL}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
