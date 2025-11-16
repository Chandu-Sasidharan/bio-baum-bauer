import { describe, it, expect, vi, afterEach } from 'vitest';
import allowCors from '../allow-cors.js';

const createMockResponse = () => {
  const res = {};
  res.setHeader = vi.fn();
  return res;
};

const createMiddleware = () => {
  const app = { use: vi.fn() };
  allowCors(app);
  return app.use.mock.calls[0][0];
};

describe('allowCors middleware', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('sets CORS headers when the request origin matches the allowed frontend', () => {
    vi.stubEnv('FRONTEND_URL', 'https://frontend.example.com');
    const middleware = createMiddleware();
    const req = { headers: { origin: 'https://frontend.example.com' } };
    const res = createMockResponse();
    const next = vi.fn();

    middleware(req, res, next);

    expect(res.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Origin',
      'https://frontend.example.com'
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      'Access-Control-Allow-Credentials',
      'true'
    );
    expect(next).toHaveBeenCalled();
  });

  it('ignores origins that are not explicitly allowed', () => {
    vi.stubEnv('FRONTEND_URL', 'https://frontend.example.com');
    const middleware = createMiddleware();
    const req = { headers: { origin: 'https://unknown.example.com' } };
    const res = createMockResponse();
    const next = vi.fn();

    middleware(req, res, next);

    expect(res.setHeader).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
