import { Author } from './author.entity';
import { validate } from 'class-validator';

describe('Author', () => {

  it('can be created with no errors', async () => {
    const author = new Author();
    const errors = await validate(author);

    expect(errors).toHaveLength(0);
  });

  it('can not be name Robert 🥲', async () => {
    const author = new Author('Robert');

    await validate(author).then(errors => {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('IsNotRobert', 'name must not be Robert');
    });
  });
});