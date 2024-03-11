import { GraphqlRateLimiterMiddleware } from './graphql-rate-limiter.middleware';
import * as process from 'process';

describe('GraphqlRateLimiterMiddleware', () => {
  const req: any = { user: 'test' };
  const res: any = {
    status: jest.fn().mockReturnValue({ send: jest.fn() }),
  };
  const next = jest.fn()
    .mockImplementation(() => ({ status: 200, body: { data: { test: 'test' } } }));

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.RATE_LIMIT_POINTS = undefined;
    process.env.RATE_LIMIT_DURATION = undefined;
    process.env.RATE_LIMIT_BLOCK = undefined;
  });

  it('should be defined', () => {
    expect(new GraphqlRateLimiterMiddleware()).toBeDefined();
  });

  it('should not trigger rate limiting', async () => {
    const middleware = new GraphqlRateLimiterMiddleware();
    await middleware.use(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should trigger rate limiting', async () => {
    process.env.RATE_LIMIT_POINTS = '0';
    process.env.RATE_LIMIT_DURATION = '1';
    process.env.RATE_LIMIT_BLOCK = '20';
    const middleware = new GraphqlRateLimiterMiddleware();
    await middleware.use(req, res, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(429);
  });

  it('should trigger rate limiting by user', async () => {
    process.env.RATE_LIMIT_POINTS = '1';
    process.env.RATE_LIMIT_DURATION = '20';
    process.env.RATE_LIMIT_BLOCK = '40';
    const middleware = new GraphqlRateLimiterMiddleware();

    // user 1
    await middleware.use(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
    await middleware.use(req, res, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(429);

    // user 2
    await middleware.use({ ...req, user: 'other' }, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
