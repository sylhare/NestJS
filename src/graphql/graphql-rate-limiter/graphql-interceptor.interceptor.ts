import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

/**
 * In AppModule for all calls, apply it using:
 * ```
 *   providers: [
 *     {
 *       provide: APP_INTERCEPTOR,
 *       useClass: GraphqlRateLimiterInterceptor,
 *     },
 *   ]
 * ```
 */
@Injectable()
export class GraphqlInterceptor implements NestInterceptor {
  private readonly logger = new Logger(GraphqlInterceptor.name);

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
    }
    return next.handle()
      .pipe(tap((data) => this.logger.log(`Data retrieved ${Object.keys(data)}`)));
  }
}
