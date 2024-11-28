import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

export interface IHash {
  generateHash(plainText: string): Promise<string>;
  compareHash(plainText: string, valueHashed: string): Promise<boolean>;
}

@Injectable()
export class BcryptService implements IHash {
  async generateHash(plainText: string): Promise<string> {
    const saltRounds = 10;
    const hashed =  await bcrypt.hash(plainText, saltRounds);

    return hashed
  }

  async compareHash(plainText: string, valueHashed: string) {
    return await bcrypt.compare(plainText, valueHashed);
  }
}