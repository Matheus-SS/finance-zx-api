import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './createUser.dto';

describe('CreateUserDto', () => {
  let validUserData: any;

  beforeEach(() => {
    validUserData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secure123password',
      url_avatar: 'https://example.com/avatar.jpg',
      setting_id: 1
    };
  });

  describe('name validation', () => {
    it('should pass with valid name', async () => {
      const dto = plainToInstance(CreateUserDto, validUserData);
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail when name is not a string', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        name: 123
      });
      const errors = await validate(dto);
      expect(errors[0].constraints?.isString).toBe('validation.user.IS_STRING_NAME');
    });

    it('should fail when name is exactly 1 character', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        name: 'a'
      });
      const errors = await validate(dto);
      expect(errors[0].constraints.isLength).toBe('validation.user.LENGTH_NAME');
    });

    it('should pass when name is exactly 2 characters', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        name: 'Jo'
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass when name is exactly 50 characters', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        name: 'a'.repeat(50)
      });
      const errors = await validate(dto);
   
      expect(errors.length).toBe(0);
    });

    it('should fail when name contains only whitespace', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        name: '   '
      });
      const errors = await validate(dto);
      expect(errors[0].constraints?.isLength).toBe('validation.user.LENGTH_NAME');
    });

    it('should fail when name is undefined', async () => {
      const { name, ...dataWithoutName } = validUserData;
      const dto = plainToInstance(CreateUserDto, dataWithoutName);
      const errors = await validate(dto);
      
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('email validation', () => {
    it('should pass with valid email', async () => {
      const dto = plainToInstance(CreateUserDto, validUserData);
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass with email containing plus sign', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        email: 'john+test@example.com'
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass with email containing subdomain', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        email: 'john@subdomain.example.com'
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail with email missing @', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        email: 'johnexample.com'
      });
      const errors = await validate(dto);
      expect(errors[0].constraints?.isEmail).toBe('validation.user.INVALID_EMAIL');
    });

    it('should fail with email containing spaces', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        email: 'john doe@example.com'
      });
      const errors = await validate(dto);
      expect(errors[0].constraints?.isEmail).toBe('validation.user.INVALID_EMAIL');
    });
  });

  describe('url avatar validation', () => {
    it('should pass with exactly 10 characters', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        url_avatar: '1234567890'
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass with exactly 250 characters', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        url_avatar: 'a'.repeat(250)
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass with empty string when field is optional', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        url_avatar: ''
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should handle url_avatar with special characters', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        url_avatar: 'https://example.com/avatar?id=123&size=large#fragment'
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('password validation', () => {
    it('should pass with exactly 6 characters', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        password: '123456'
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass with exactly 25 characters', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        password: 'a'.repeat(25)
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail with password containing only spaces', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        password: ' '.repeat(10)
      });
      const errors = await validate(dto);
      expect(errors[0].constraints?.isLength).toBe('validation.user.LENGTH_PASSWORD');
    });

    it('should handle password with special characters', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        password: '!@#$%^&*()'
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('settingId validation', () => {
    it('should fail with decimal number', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        setting_id: 1.1
      });
      const errors = await validate(dto);
      expect(errors[0].constraints?.isInt).toBe('validation.user.IS_INT_SETTING_ID');
    });

    it('should fail with string number', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        setting_id: '1'
      });
      const errors = await validate(dto);
      expect(errors[0].constraints?.isInt).toBe('validation.user.IS_INT_SETTING_ID');
    });

    it('should fail with negative number', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        setting_id: -1
      });
      const errors = await validate(dto);
      expect(errors[0].constraints?.min).toBe('validation.user.MIN_SETTING_ID');
    });

    it('should pass with MAX_SAFE_INTEGER', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        setting_id: Number.MAX_SAFE_INTEGER
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('edge cases and type coercion', () => {
    it('should handle empty object submission', async () => {
      const dto = plainToInstance(CreateUserDto, {});
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      
      const errorFields = errors.map(error => error.property);
      expect(errorFields).toContain('name');
      expect(errorFields).toContain('email');
      expect(errorFields).toContain('password');
    });

    it('should handle undefined values for required fields', async () => {
      const dto = plainToInstance(CreateUserDto, {
        name: undefined,
        email: undefined,
        password: undefined
      });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should handle object with extra properties', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        extraField: 'should be ignored'
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should validate all fields with mixed invalid types', async () => {
      const dto = plainToInstance(CreateUserDto, {
        name: 123,
        email: [],
        password: {},
        url_avatar: true,
        setting_id: '1'
      });
      const errors = await validate(dto);
      
      const errorMessages = errors.map(error => Object.values(error.constraints || {})).flat();
      expect(errorMessages).toContain('validation.user.IS_STRING_NAME');
      expect(errorMessages).toContain('validation.user.IS_STRING_EMAIL');
      expect(errorMessages).toContain('validation.user.IS_STRING_PASSWORD');
      expect(errorMessages).toContain('validation.user.IS_INT_SETTING_ID');
    });
  });

  describe('data sanitization', () => {
    it('should handle trimmed strings', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        name: '  John Doe  ',
        email: ' john@example.com ',
        password: ' password123 '
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should handle unicode characters in strings', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validUserData,
        name: '🙂 John Doe 世界',
        password: 'password🔒123'
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });
});