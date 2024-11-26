import { Create, IUserRepository, RCreate, RFindByEmail } from "./user.interface";

export class FakeUserRepository implements IUserRepository {
  create(data: Create): Promise<RCreate> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<RFindByEmail> {
    throw new Error("Method not implemented.");
  }
}