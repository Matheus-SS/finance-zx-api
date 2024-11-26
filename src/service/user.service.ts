import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../persistence/user.interface";
import { CreateUserDto } from "../controller/user/dto/createUser.dto";
import { BCRYPT_SERVICE, USER_REPOSITORY } from "../constants";
import { IHash } from "../extra/bcrypt.service";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    @Inject(BCRYPT_SERVICE) private readonly bcryptService: IHash
  ) {}

  public async create(data: CreateUserDto): Promise<string> {
    const user = await this.userRepo.findByEmail(data.email);

    if (user) {
      throw new ConflictException('domain.user.ALREADY_EXISTS');
    }
    
    const passwordHashed = await this.bcryptService.generateHash(data.password);

    await this.userRepo.create({
      ...data,
      password: passwordHashed,
      setting_id: data?.setting_id ? data.setting_id : null,
      url_avatar: data?.url_avatar ? data.url_avatar : null
    });

    return 'ok';
  }
}