import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "@persistence/user.interface";
import { BCRYPT_SERVICE, JWT_SERVICE, USER_REPOSITORY } from "@app/constants";
import { IHash } from "@extra/bcrypt.service";
import { IJwt } from "@extra/jwt.service";
import { LoginDto } from "@controller/auth/dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    @Inject(BCRYPT_SERVICE) private readonly bcryptService: IHash,
    @Inject(JWT_SERVICE) private readonly jwtService: IJwt
  ) {}

  public async login(data: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException('domain.auth.INCORRECT_EMAIL_OR_PASSWORD');
    }

    const passwordMatch = await this.bcryptService.compareHash(data.password, user.password);
    
    if (!passwordMatch) {
      throw new NotFoundException('domain.auth.INCORRECT_EMAIL_OR_PASSWORD');
    }

    const token = this.jwtService.generateToken({ userId: user.id });
    
    return {
      access_token: token
    };
  }
  
}