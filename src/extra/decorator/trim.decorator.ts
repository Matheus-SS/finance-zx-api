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

        registerDecorator({
            name: "isNotBlank",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                   return true
                }
            }
        });
    };
}

// export function IsNotBlank(
//     property: string,
//     validationOptions?: ValidationOptions,
//   ) {
//     // eslint-disable-next-line @typescript-eslint/ban-types
//     return function(object: Object, propertyName: string) {
//       registerDecorator({
//         name: 'isPostalCodeOf',
//         target: object.constructor,
//         propertyName: propertyName,
//         constraints: [property],
//         options: validationOptions,
//         validator: {
//           validate(value: any, args: ValidationArguments) {
//             // Getting the country code field from the argument.
//             // countryCode field from SignupDto
//             const [countryCodeField] = args.constraints;
//             // Getting the value of the countryCode Field
//             const countryCode = (args.object as any)[countryCodeField];
//             // Checking if the country code is valid even though it is checked 
//             // at class level 
//             if (!isISO31661Alpha2(countryCode)) {
//             // Invalid county code
//               return false;
//             }
//             // Checks if the value (zip) belongs in the extracted countryCode 
//             // field
//             return isPostalCode(value,countryCode);
//           },
//           // Specifiy your error message here.
//           defaultMessage: buildMessage(
//             eachPrefix =>
//               `${eachPrefix} $property must be a valid postal 
//                code in the specified country `,
//             validationOptions,
//           ),
//         },
//       });
//     };
//   }