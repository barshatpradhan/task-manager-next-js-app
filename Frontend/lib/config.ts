const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

// Validate required env vars in production
if (config.isProduction && !process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL must be set in production');
}

export default config;