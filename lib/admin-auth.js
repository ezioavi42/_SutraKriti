import { timingSafeEqual } from 'node:crypto';

function secureEquals(value, expected) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return valueBuffer.length === expectedBuffer.length && timingSafeEqual(valueBuffer, expectedBuffer);
}

export function getAdminAuthState(request) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const configured = Boolean(username && password);
  if (!configured) return { configured: false, authenticated: false };

  const authorization = request.headers.get('authorization') || '';
  if (!authorization.startsWith('Basic ')) return { configured: true, authenticated: false };

  try {
    const credentials = Buffer.from(authorization.slice(6), 'base64').toString('utf8');
    return { configured: true, authenticated: secureEquals(credentials, `${username}:${password}`) };
  } catch {
    return { configured: true, authenticated: false };
  }
}
