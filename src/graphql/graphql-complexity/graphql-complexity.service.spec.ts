import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLComplexityService } from './graphql-complexity.service';
import { ASTNode, DocumentNode, SelectionNode } from 'graphql/index';
import { print, visit } from 'graphql/language';
import { gql, resetCaches } from 'graphql-tag';

describe('GraphQLComplexityService', () => {
  let service: GraphQLComplexityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphQLComplexityService],
    }).compile();

    service = module.get<GraphQLComplexityService>(GraphQLComplexityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('depth calculation', () => {

    it('should calculate depth of query', () => {
      const query = gql`
              query {
                book(id: 1) {
                  id
                  author {
                    books {
                      author {
                        books {
                          title
                          author {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            `;
      expect(depth(query)).toEqual(8);

    });

    function depth(node: ASTNode, level = 1) {
      switch (node.kind) {
        case 'Document':
          // If it's a document, then traverse all its definitions
          return Math.max(0, ...node.definitions.map(definition => depth(definition, level)));
        case 'OperationDefinition':
          // If it's an operation or a selection, traverse all its selection set's selections
          return Math.max(0, ...node.selectionSet.selections.map(selection => depth(selection, level + 1)));
        case 'SelectionSet':
          // If it's an operation or a selection, traverse all its selections
          return Math.max(0, ...node.selections.map(selection => depth(selection, level + 1)));
        case 'Field':
          // If it's a field, traverse its selection set
          return node.selectionSet
            ? depth(node.selectionSet, level)
            : level;
        default:
          // By default, return the received level
          return level;
      }
    }
  });

  describe('duplicate fields', () => {

    it('should be defined', () => {
      const query = gql`
              fragment codeFirst on CodeFirst {
                __typename
                __typename
              }
              query {
                codeFirst(id: 1) {
                  __typename
                  __typename
                  ...codeFirst
                  ... on CodeFirst {
                    __typename
                    __typename
                  }
                }
              }
            `;
      resetCaches(); // No need for the gql cache in this test
      expect(print(removeDuplicateFields(query))).toEqual(print(gql`
              fragment codeFirst on CodeFirst {
                __typename
              }

              {
                codeFirst(id: 1) {
                  __typename
                  ...codeFirst
                  ... on CodeFirst {
                    __typename
                  }
                }
              }
            `));
    });

    function removeDuplicateFields(document: DocumentNode) {
      return visit(document, {
        SelectionSet: node => {
          node.selections = node.selections.reduce<SelectionNode[]>((selections, current) => {
            return selections.some(sel => {
              const selectionName = sel['name'] ?? sel['typeCondition']?.name;
              switch (current.kind) {
                case 'Field':
                case 'FragmentSpread':
                  return current.name.value === selectionName.value;
                case 'InlineFragment':
                  return current.typeCondition.name.value === selectionName.value;
                default:
                  return false;
              }
            }) ? selections : [...selections, current];
          }, []);
        },
      });
    }
  });
});
