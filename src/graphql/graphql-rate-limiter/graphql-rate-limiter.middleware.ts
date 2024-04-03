import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { ConfigService } from '@nestjs/config';
import { DefinitionNode, parse } from 'graphql';
import { OperationDefinitionNode, print } from 'graphql/language';
import { GraphQLComplexityService } from '../graphql-complexity/graphql-complexity.service';

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

  private readonly limiter: RateLimiterMemory;
  private readonly logger = new Logger(GraphqlRateLimiterMiddleware.name);
  private readonly complexityService = new GraphQLComplexityService();

  constructor(private readonly configService: ConfigService) {

    this.limiter = new RateLimiterMemory({
      points: this.configService.get<number>('RATE_LIMIT_POINTS', 30),      // max request by duration
      duration: this.configService.get<number>('RATE_LIMIT_DURATION', 1),    // per second
      blockDuration: this.configService.get<number>('RATE_LIMIT_BLOCK', 10), // blocks for x second once rate exceeded
      keyPrefix: 'ratelimit',
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    return await this.handleRateLimit(req, res, next);
  }

  private async handleRateLimit(req: Request, res: Response, next: NextFunction) {
    const user = req.body?.user ?? 'anonymous';
    try {
      const status = this.complexityService.calculateComplexity(req);
      this.logger.verbose(JSON.stringify(status));
      await this.limiter.consume(user, status.cost);
      return next();
    } catch (rateLimitResponse) {
      this.logger.debug(`Rate limit for user ${user} is ${await this.limiter.get(user)} - ${rateLimitResponse}`);
      return res.status(HttpStatus.TOO_MANY_REQUESTS).send({
        errors: [{
          message: 'Rate limit exceeded',
          limit: rateLimitResponse,
          extensions: {
            code: 'TOO_MANY_REQUESTS',
          },
        }],
      });
    }
  }
}
