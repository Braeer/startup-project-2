import jwt from 'jsonwebtoken';
import '@/envConfig';

export function validateToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return Boolean(decoded);
  } catch {
    return false;
  }
}
