const WINDOW_MS = 60_000;
const buckets = new Map();

function clientIp(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

export function consumeRateLimit(request, route, limit) {
  const now = Date.now();
  const key = `${route}:${clientIp(request)}`;
  const current = buckets.get(key);
  const active = current && now - current.startedAt < WINDOW_MS
    ? current
    : { startedAt: now, count: 0 };

  active.count += 1;
  buckets.set(key, active);

  if (active.count <= limit) return { allowed: true };
  return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((WINDOW_MS - (now - active.startedAt)) / 1000)) };
}
