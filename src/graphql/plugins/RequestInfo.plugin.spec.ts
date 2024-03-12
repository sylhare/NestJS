import { parse, visit } from 'graphql/language';
import { RequestInfoPlugin } from './RequestInfo.plugin';

describe('Around plugins', () => {
  const test = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('can build RequestInfoPlugin', () => {
    expect(new RequestInfoPlugin()).toBeDefined();
  });

  it('GraphQL request', () => {
    const request = {
      query: 'query codeFirst($id: Int!) {\n codeFirst(id: $id) {\n   id\n   exampleField\n }\n}',
      variables: {
        id: 1,
      },
      http: {
        method: 'POST',
        headers: {},
        search: '',
        body: {
          query: 'query codeFirst($id: Int!) {\n codeFirst(id: $id) {\n   id\n   exampleField\n }\n}',
          variables: {
            id: 1,
          },
        },
      },
    };

    const visitor = {
      Field(node) {
        test(node.name.value);
      },
    };

    const document = parse(request.query);
    console.log('document', document);
    visit(document, visitor);
    expect(test).toHaveBeenCalledWith('codeFirst');
    expect(test).toHaveBeenCalledWith('id');
    expect(test).toHaveBeenCalledWith('exampleField');
    expect(test).toHaveBeenCalledTimes(3);
  });
});