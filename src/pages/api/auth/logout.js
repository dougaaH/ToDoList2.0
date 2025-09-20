import { serialize } from 'cookie';
const COOKIE_NAME = process.env.COOKIE_NAME || 'todo_token';
export default function handler(req, res) {
  res.setHeader('Set-Cookie', serialize(COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 }));
  res.json({ ok: true });
}