interface GraphQLQuery {
  query: string;
  variables?: Record<string, any>;
  operationName?: string;
}

interface EmptyGraphQLCall {
  body: { query: undefined };
}

interface GraphQLCall {
  body: GraphQLQuery;
}

interface GraphQLBatchCall {
  body: GraphQLQuery[];
}

export type GraphQLRequest = GraphQLCall | GraphQLBatchCall | EmptyGraphQLCall;