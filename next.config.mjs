/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true, 
  images: {
    domains: ['https://www.tagtrace.online'], // If using external images
  },
  // Other config...
};

export default pwaConfig(nextConfig);