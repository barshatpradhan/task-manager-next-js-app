import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

// Validate required variables
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];
const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingEnvVars.length > 0) {
  console.error('Missing env vars:', missingEnvVars.join(', '));
  process.exit(1);
}

console.log('Environment variables loaded');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '***SET***' : ' NOT SET');
console.log('   DATABASE_URL:', process.env.DATABASE_URL ? '***SET***' : ' NOT SET');

export {}; // Make this a module