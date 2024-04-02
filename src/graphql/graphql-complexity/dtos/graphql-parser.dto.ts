import { ASTNode, DirectiveNode, DocumentNode, parse, visit } from 'graphql/index';
import { OperationDefinitionNode, print } from 'graphql/language';
import { Logger } from '@nestjs/common';
import { ASTVisitor } from 'graphql/language/visitor';
import { EMPTY_QUERY_STATUS, GraphQLDocumentStatus } from './graphql-document.status';

export class GraphQLParser {
  readonly logger = new Logger(GraphQLParser.name);

  parse(query?: string): GraphQLDocumentStatus {
    try {
      if (!query) return EMPTY_QUERY_STATUS;
      const ast = parse(query);
      return this.explore(ast);
    } catch (error) {
      this.logger.warn(`Query could not be parsed: ${error}`);
    }
  }

  private explore(ast: DocumentNode): GraphQLDocumentStatus {
    let directiveCount = 0;
    let aliasCount = 0;
    let maxDepth = 0;
    let depth = 0;
    let cost = 0;
    let fieldNames = [];

    const onFieldLeft = (node: ASTNode) => {
      if (node.kind === 'Field') {
        fieldNames[fieldNames.length - 1].add(node.name.value);
        depth--;
      }
    };

    const visitor: ASTVisitor = {
      Directive(node: DirectiveNode) {
        directiveCount++;
      },
      SelectionSet: {
        enter() {
          fieldNames.push(new Set());
        },
        leave() {
          fieldNames.pop();
        },
      },
      OperationDefinition: (node: OperationDefinitionNode) => {
        cost += node.operation === 'mutation' ? 10 : 1;
      },
      enter(node: ASTNode) {
        if (node.kind === 'Field') {
          depth++;
          if (depth > maxDepth) maxDepth = depth;
          if (node.alias) aliasCount++;
          if (fieldNames[fieldNames.length - 1].has(node.name.value)) {
            onFieldLeft(node);
            return null; // Remove this node if its name is already in the set
          }
        }
      },
      leave: onFieldLeft,
    };
    const updatedDocument = visit(ast, visitor);
    return {
      directiveCount,
      aliasCount,
      depth: maxDepth,
      cost,
      updatedQuery: print(updatedDocument).replace(/\s\s+/g, ' ').replace(/\n/g, '').trim(),
    };
  }
}