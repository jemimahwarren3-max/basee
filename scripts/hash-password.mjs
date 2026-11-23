// Hashes a password so it can go in .env.local as ADMIN_PASSWORD_HASH.
// Usage: npm run hash-password -- 'your password here'
// The hash matches what AuthGate.astro checks in the browser (SHA-256, hex).
import { createHash } from 'node:crypto';

const password = process.argv[2];
if (!password) {
  console.error("Usage: npm run hash-password -- 'password'");
  process.exit(1);
}

const hash = createHash('sha256').update(password).digest('hex');
console.log('\nAdd this to .env.local:');
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log('\nKeep the password itself out of version control.');
