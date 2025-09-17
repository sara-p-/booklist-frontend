import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.readthatbooklist.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default nextConfig
