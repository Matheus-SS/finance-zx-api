import { Transform } from "class-transformer";
import { registerDecorator, ValidationOptions } from "class-validator";

export function Trim(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return value?.trim()
      }
      return value;
    })(object, propertyName);
  };
}
