import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
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

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      console.log(Object.keys(request.body));
    }
    return next.handle()
      .pipe(tap((data) => console.log(`Data retrieved ${JSON.stringify(data)}`)));
  }
}
