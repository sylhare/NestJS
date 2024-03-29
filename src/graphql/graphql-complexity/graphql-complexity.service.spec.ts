import { Test, TestingModule } from '@nestjs/testing';
import { GraphqlComplexityService } from './graphql-complexity.service';
import { DocumentNode, SelectionNode } from 'graphql/index';
import { print, visit } from 'graphql/language';
import { gql, resetCaches } from 'graphql-tag';

describe('GraphqlComplexityService', () => {
  let service: GraphqlComplexityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphqlComplexityService],
    }).compile();

    service = module.get<GraphqlComplexityService>(GraphqlComplexityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
