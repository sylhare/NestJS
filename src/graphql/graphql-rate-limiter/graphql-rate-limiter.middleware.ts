import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import RedisMock from 'ioredis-mock';
import { ConfigService } from '@nestjs/config';
import { DefinitionNode, parse } from 'graphql';
import { OperationDefinitionNode } from 'graphql/language/ast';

/**
 * In AppModule, apply it using:
 * ```
 *   configure(consumer: MiddlewareConsumer) {
 *     consumer
 *       .apply(GraphqlRateLimiterMiddleware)
 *       .forRoutes('graphql');
 *   }
 * ```
 */
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

  private static operationToPoints(definition: DefinitionNode): number {
    if (definition.kind !== 'OperationDefinition') return 0;
    const node = definition as OperationDefinitionNode;
    return node.operation === 'mutation' ? 10 : 1;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const user = req.body.user ?? 'anonymous';
    try {
      const document = parse(req.body.query);
      const weight = document.definitions
        .reduce((total, current) => total + GraphqlRateLimiterMiddleware.operationToPoints(current), 0);
      await this.limiter.consume(user, weight);
      next();
    } catch (rateLimitingException) {
      console.log(`Rate limit for user${user} is ${rateLimitingException}`);
      res.status(HttpStatus.TOO_MANY_REQUESTS).send('Too Many Requests');
    }
  }
}
