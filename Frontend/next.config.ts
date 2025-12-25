
// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;