import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

export interface IHash {
  generateHash(valueRaw: string): Promise<string>;
}

@Injectable()
export class BcryptService implements IHash {
  async generateHash(valueRaw: string): Promise<string> {
    const saltRounds = 10;
    const hashed =  await bcrypt.hash(valueRaw, saltRounds);

    return hashed
  }
}