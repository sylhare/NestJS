import { Injectable, Logger } from '@nestjs/common';
import { ASTNode, DirectiveNode, DocumentNode } from 'graphql/index';
import { visit } from 'graphql';
import { ASTVisitor } from 'graphql/language/visitor';

@Injectable()
export class GraphqlComplexityService {
  private readonly logger = new Logger(GraphqlComplexityService.name);
}
