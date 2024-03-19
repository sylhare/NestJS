import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestContextDidResolveOperation,
  GraphQLRequestContextWillSendResponse,
  GraphQLRequestListener,
} from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { AppContext } from '../../app.module';

@Plugin()
export class RequestInfoPlugin implements ApolloServerPlugin<AppContext> {
  async requestDidStart(_: GraphQLRequestContext<AppContext>): Promise<GraphQLRequestListener<AppContext>> {
    const start = Date.now();
    let operation: string | null;

    return {
      async didResolveOperation(context: GraphQLRequestContextDidResolveOperation<AppContext>) {
        operation = context.operationName ?? context.operation.operation;
      },
      async willSendResponse(context: GraphQLRequestContextWillSendResponse<AppContext>) {
        const elapsed = Math.round(Date.now() - start);
        const size = JSON.stringify(context.response).length * 2;
        console.log(
          `GraphQL Request: operation=${operation} duration=${elapsed}ms bytes=${size}`,
        );
      },
    };
  }
}