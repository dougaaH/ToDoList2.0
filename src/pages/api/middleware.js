import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export function getUserFromReq(req) {
  const cookie = req.headers.cookie;
  if (!cookie) return null;
  const { [process.env.COOKIE_NAME || 'todo_token']: token } = parse(cookie || '');
  if (!token) return null;
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data; // { userId, email, iat, exp }
  } catch (_) {
    return null;
  }
}