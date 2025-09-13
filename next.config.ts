import type {NextConfig} from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

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
  // Enable static export only for GitHub Pages deployment
  ...(isGitHubPages && {
    output: 'export',
    trailingSlash: true,
    basePath: '/leetcode-widget',
    assetPrefix: '/leetcode-widget/',
  }),
};

export default nextConfig;
