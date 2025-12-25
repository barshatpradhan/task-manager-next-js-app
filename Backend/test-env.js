require('dotenv').config();

console.log('\n=== Environment Variables Test ===\n');
console.log('JWT_SECRET:', process.env.JWT_SECRET || '❌ NOT SET');
console.log('DATABASE_URL:', process.env.DATABASE_URL || '❌ NOT SET');
console.log('PORT:', process.env.PORT || '❌ NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV || '❌ NOT SET');
console.log('\n================================\n');