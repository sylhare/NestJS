import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import RedisMock from 'ioredis-mock';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GraphqlRateLimiterMiddleware implements NestMiddleware {

  private readonly limiter: RateLimiterRedis;

  constructor(private readonly configService: ConfigService) {
    const redisClient = new RedisMock();

    this.limiter = new RateLimiterRedis({
      storeClient: redisClient,
      points: this.configService.get<number>('RATE_LIMIT_POINTS', 100),      // max request by duration
      duration: this.configService.get<number>('RATE_LIMIT_DURATION', 1),    // per second
      blockDuration: this.configService.get<number>('RATE_LIMIT_BLOCK', 60), // blocks for x second once rate exceeded
      keyPrefix: 'ratelimit',
    });
  }

  async use(req: Request & { user: string }, res: Response, next: NextFunction) {
    try {
      await this.limiter.consume(req.user ?? 'anonymous');
      next();
    } catch (rateLimitingException) {
      console.log(rateLimitingException);
      res.status(429).send('Too Many Requests');
    }
  }
}
