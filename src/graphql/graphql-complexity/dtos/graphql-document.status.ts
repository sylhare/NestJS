export interface GraphQLDocumentStatus {
  cost: number;
  depth: number;
  aliasCount: number;
  directiveCount: number;
  updatedQuery: string | string[];
}

export const EMPTY_QUERY_STATUS: GraphQLDocumentStatus = {
  cost: 0,
  depth: 0,
  directiveCount: 0,
  aliasCount: 0,
  updatedQuery: '',
};

export const EMPTY_BATCH_QUERY_STATUS: GraphQLDocumentStatus = {
  ...EMPTY_QUERY_STATUS,
  updatedQuery: [],
};