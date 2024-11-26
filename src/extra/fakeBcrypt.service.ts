import { IHash } from "./bcrypt.service";

export class FakeBcryptService implements IHash {
  generateHash(valueRaw: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}