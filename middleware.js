import { NextResponse } from 'next/server';

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="SutraKriti Admin", charset="UTF-8"' },
  });
}

export function middleware(request) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    return new NextResponse('Admin access is not configured', { status: 503 });
  }

  const authorization = request.headers.get('authorization') || '';
  if (!authorization.startsWith('Basic ')) return unauthorized();

  try {
    const credentials = atob(authorization.slice(6));
    return credentials === `${username}:${password}` ? NextResponse.next() : unauthorized();
  } catch {
    return unauthorized();
  }
}

export const config = { matcher: ['/admin/:path*'] };
