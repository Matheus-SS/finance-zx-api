import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../persistence/user.interface";
import { CreateUserDto } from "../controller/user/dto/createUser.dto";
import { USER_REPOSITORY } from "../constants";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository
  ) {}

  public async create(data: CreateUserDto) {
    const res = await this.userRepo.create({
      ...data,
      setting_id: data?.settingId ? data.settingId : null,
      url_avatar: data?.urlAvatar ? data.urlAvatar : null
    });
    return;
  }
}