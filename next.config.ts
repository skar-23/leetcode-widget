import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.leetcode.com',
        port: '',
        pathname: '/**',
      }
    ],
    unoptimized: true, // Required for static export
  },
  output: 'export', // Enable static export for GitHub Pages
  trailingSlash: true, // Add trailing slash for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/leetcode-widget' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/leetcode-widget/' : '',
};

export default nextConfig;
