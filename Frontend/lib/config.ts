const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

// Only validate in the browser (runtime), not during build
if (typeof window !== 'undefined' && config.isProduction && !process.env.NEXT_PUBLIC_API_URL) {
  console.error('⚠️ Warning: NEXT_PUBLIC_API_URL is not set in production');
}

export default config;