import { BcryptService, IHash } from "../../../extra/bcrypt.service";
import { FakeUserRepository } from "../../../persistence/fakeUser.repository"
import { IUserRepository } from "../../../persistence/user.interface"
import { UserService } from "../../../service/user.service";
import { CreateUserDto } from "../../../controller/user/dto/createUser.dto";
import { ConflictException } from "@nestjs/common";

describe('User service create', () => {
  let requestBody: CreateUserDto;
  let validUserData: any;

  let userRepo: IUserRepository;
  let bcryptService: IHash;
  let userService: UserService;
  
  beforeEach(() => {
     userRepo = new FakeUserRepository();
     bcryptService = new BcryptService();

     userService = new UserService(userRepo, bcryptService);

     requestBody = {
      email: 'jhon@doe.com',
      name: 'jhon doe',
      url_avatar: "http://avatar.com",
      password: "123456",
      setting_id: 1
     }

    validUserData = {
      id: 1,
      email: 'jhon@doe.com',
      name: 'jhon doe',
      url_avatar: "http://avatar.com",
      password: "123456",
      setting_id: 1,
      created_at: new Date().getTime(),
      updated_at: null
    };

    jest.clearAllMocks();
  })

  it('should throw conflicted error', async () => {
    jest.spyOn(userRepo, 'findByEmail').mockResolvedValueOnce(validUserData);

    await expect(userService.create(requestBody)).rejects.toThrow(new ConflictException('domain.user.ALREADY_EXISTS'));
  });

  it('should create an user', async () => {
    jest.spyOn(userRepo, 'findByEmail').mockResolvedValueOnce(null);

    jest.spyOn(bcryptService, 'generateHash').mockResolvedValueOnce('hashedPassword');

    jest.spyOn(userRepo, 'create').mockResolvedValueOnce(validUserData);

    const res = await userService.create(requestBody);

    expect(res).toEqual('ok');
    expect(bcryptService.generateHash).toHaveBeenCalledTimes(1);
    expect(userRepo.create).toHaveBeenCalledTimes(1);
  });
})