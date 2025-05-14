// middleware.ts
import { NextResponse } from 'next/server';
import { corsMiddleware } from './middleware/corsMiddleware';

export function middleware() {
  let res = NextResponse.next();

  // Cors.
  res = corsMiddleware(res);

  return res;
}