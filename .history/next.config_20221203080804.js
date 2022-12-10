/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    API_URL: process.env.API_URL,
    SERVICE_KEY: process.env.SERVICE_KEY,
    SERVICE_ID: process.env.SERVICE_ID,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET
  },
  async redirects() {
    return [
      {
        source: '/create-campain',
        destination: '/nouvelle-campagne',
        permanent: false,
      },
      {
        source: '/new-campain',
        destination: '/nouvelle-campagne',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig
