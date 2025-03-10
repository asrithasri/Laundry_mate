import { randomBytes } from 'crypto';

export function generateAuthToken(): string {
  return randomBytes(8).toString('hex'); // Generates a 16-character alphanumeric token
}


