import { CreateAuthorInput } from './create-author.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('CreateAuthorDto', () => {
  it('does not return error on valid input', async () => {
    const input = plainToInstance(CreateAuthorInput, { name: 'author' });
    await expect(validate(input)).resolves.toEqual([]);
  });

  it('returns error on empty name', async () => {
    const input = plainToInstance(CreateAuthorInput, { name: '' });
    const error = await validate(input);
    expect(error[0].constraints).toEqual(expect.objectContaining({ isNotEmpty: 'name should not be empty' }));
  });

  it('returns error on name Robert', async () => {
    const input = plainToInstance(CreateAuthorInput, { name: 'Robert' });
    const error = await validate(input);
    expect(error[0].constraints).toEqual({ isNotRobert: 'name must not be Robert' });
  });

  it('returns error on short name', async () => {
    const input = plainToInstance(CreateAuthorInput, { name: 'a' });
    const error = await validate(input);
    expect(error[0].constraints).toEqual({ isLongEnough: 'name is too short' });
  });
});