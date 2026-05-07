import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

const validateDto = (payload: object) =>
  validate(plainToInstance(CreateUserDto, payload));

describe('CreateUserDto', () => {
  it('passes validation with valid firstName and lastName', async () => {
    const errors = await validateDto({
      firstName: 'Jean',
      lastName: 'Dupont',
    });

    expect(errors).toHaveLength(0);
  });

  describe('firstName', () => {
    it('fails when missing', async () => {
      const errors = await validateDto({ lastName: 'Dupont' });
      const firstNameErrors = errors.find((e) => e.property === 'firstName');

      expect(firstNameErrors).toBeDefined();
    });

    it('fails when empty', async () => {
      const errors = await validateDto({ firstName: '', lastName: 'Dupont' });
      const firstNameErrors = errors.find((e) => e.property === 'firstName');

      expect(firstNameErrors?.constraints).toHaveProperty('isNotEmpty');
    });

    it('fails when shorter than 2 characters', async () => {
      const errors = await validateDto({ firstName: 'S', lastName: 'Dupont' });
      const firstNameErrors = errors.find((e) => e.property === 'firstName');

      expect(firstNameErrors?.constraints).toHaveProperty('minLength');
    });

    it('fails when not a string', async () => {
      const errors = await validateDto({ firstName: 42, lastName: 'Dupont' });
      const firstNameErrors = errors.find((e) => e.property === 'firstName');

      expect(firstNameErrors?.constraints).toHaveProperty('isString');
    });
  });

  describe('lastName', () => {
    it('fails when missing', async () => {
      const errors = await validateDto({ firstName: 'Simon' });
      const lastNameErrors = errors.find((e) => e.property === 'lastName');

      expect(lastNameErrors).toBeDefined();
    });

    it('fails when empty', async () => {
      const errors = await validateDto({ firstName: 'Simon', lastName: '' });
      const lastNameErrors = errors.find((e) => e.property === 'lastName');

      expect(lastNameErrors?.constraints).toHaveProperty('isNotEmpty');
    });

    it('fails when shorter than 2 characters', async () => {
      const errors = await validateDto({ firstName: 'Simon', lastName: 'D' });
      const lastNameErrors = errors.find((e) => e.property === 'lastName');

      expect(lastNameErrors?.constraints).toHaveProperty('minLength');
    });

    it('fails when not a string', async () => {
      const errors = await validateDto({ firstName: 'Simon', lastName: 42 });
      const lastNameErrors = errors.find((e) => e.property === 'lastName');

      expect(lastNameErrors?.constraints).toHaveProperty('isString');
    });
  });
});
