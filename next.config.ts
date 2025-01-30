import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hunterparcells.com'
      }
    ]
  }
};

export default nextConfig;
