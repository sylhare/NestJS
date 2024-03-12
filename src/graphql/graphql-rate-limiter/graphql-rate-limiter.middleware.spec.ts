import { GraphqlRateLimiterMiddleware } from './graphql-rate-limiter.middleware';
import { ConfigService } from '@nestjs/config';


class ConfigServiceMock {
  env = {
    RATE_LIMIT_POINTS: undefined,
    RATE_LIMIT_DURATION: undefined,
    RATE_LIMIT_BLOCK: undefined,
  };

  get(key: string, defaultValue: any) {
    return this.env[key] ?? defaultValue;
  }
}

describe('GraphqlRateLimiterMiddleware', () => {
  const configService = new ConfigServiceMock() as unknown as ConfigService & { env: { [key: string]: any } };
  const req: any = () => ({ user: `test-${Math.random()}` });
  const res: any = {
    status: jest.fn().mockReturnValue({ send: jest.fn() }),
  };
  const next = jest.fn()
    .mockImplementation(() => ({ status: 200, body: { data: { test: 'test' } } }));

  beforeEach(async () => {
    jest.clearAllMocks();
    configService.env = {
      RATE_LIMIT_POINTS: undefined,
      RATE_LIMIT_DURATION: undefined,
      RATE_LIMIT_BLOCK: undefined,
    };
  });

  it('should be defined', () => {
    expect(new GraphqlRateLimiterMiddleware(configService)).toBeDefined();
  });

  it('should not trigger rate limiting', async () => {
    configService.env = {
      RATE_LIMIT_POINTS: 100,
    };
    const middleware = new GraphqlRateLimiterMiddleware(configService);
    for (let i = 0; i < 100; i++) {
      await middleware.use(req(), res, next);
    }
    expect(next).toHaveBeenCalledTimes(100);
    expect(res.status).toHaveBeenCalledTimes(0);
  });

  it('should trigger rate limiting', async () => {
    configService.env = {
      RATE_LIMIT_POINTS: 0,
      RATE_LIMIT_DURATION: 1,
      RATE_LIMIT_BLOCK: 20,
    };
    const middleware = new GraphqlRateLimiterMiddleware(configService);
    await middleware.use(req(), res, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(429);
  });

  it('should trigger rate limiting by user', async () => {
    configService.env = {
      RATE_LIMIT_POINTS: 1,
      RATE_LIMIT_DURATION: 20,
      RATE_LIMIT_BLOCK: 40,
    };
    const middleware = new GraphqlRateLimiterMiddleware(configService);

    const user1 = req();
    await middleware.use(user1, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
    await middleware.use(user1, res, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(429);

    // user 2
    await middleware.use(req(), res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
