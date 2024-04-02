import { Injectable } from '@nestjs/common';
import { GraphQLRequest } from './dtos/graphql-payload.interface';
import { EMPTY_BATCH_QUERY_STATUS, EMPTY_QUERY_STATUS, GraphQLDocumentStatus } from './dtos/graphql-document.status';
import { GraphQLParser } from './dtos/graphql-parser.dto';

@Injectable()
export class GraphQLComplexityService {
  private readonly parser = new GraphQLParser();

  calculateComplexity(request: GraphQLRequest): GraphQLDocumentStatus {
    if (!request || !request.body) return EMPTY_QUERY_STATUS;
    if (Array.isArray(request.body)) {
      return request.body.map((body) => this.parser.parse(body.query)).reduce(this.mergeStatus, EMPTY_BATCH_QUERY_STATUS);
    } else {
      return this.parser.parse(request.body.query);
    }
  }

  private mergeStatus(result: GraphQLDocumentStatus, current: GraphQLDocumentStatus): GraphQLDocumentStatus {
    return {
      cost: result.cost + current.cost,
      depth: Math.max(result.depth, current.depth),
      directiveCount: Math.max(result.directiveCount, current.directiveCount),
      aliasCount: Math.max(result.aliasCount, current.aliasCount),
      updatedQuery: [...result.updatedQuery, current.updatedQuery as string],
    };
  }
}
