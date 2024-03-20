import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
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

  private readonly limiter: RateLimiterMemory;
  private readonly logger = new Logger(GraphqlRateLimiterMiddleware.name);

  constructor(private readonly configService: ConfigService) {

    this.limiter = new RateLimiterMemory({
      points: this.configService.get<number>('RATE_LIMIT_POINTS', 5),      // max request by duration
      duration: this.configService.get<number>('RATE_LIMIT_DURATION', 1),    // per second
      blockDuration: this.configService.get<number>('RATE_LIMIT_BLOCK', 10), // blocks for x second once rate exceeded
      keyPrefix: 'ratelimit',
    });
  }

  private static operationToPoints(definition: DefinitionNode): number {
    if (definition.kind !== 'OperationDefinition') return 0;
    const node = definition as OperationDefinitionNode;
    return node.operation === 'mutation' ? 10 : 1;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const user = req.body?.user ?? 'anonymous';
    const query = req.body?.query;
    if (query === undefined) return next();
    try {
      const document = parse(query);
      const weight = document.definitions
        .reduce((total, current) => total + GraphqlRateLimiterMiddleware.operationToPoints(current), 0);
      await this.limiter.consume(user, weight);
      return next();
    } catch (rateLimitResponse) {
      this.logger.debug(`Rate limit for user ${user} is ${await this.limiter.get(user)}`);
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
