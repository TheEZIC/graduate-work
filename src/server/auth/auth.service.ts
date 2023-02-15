import { HttpException, HttpStatus, Injectable, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import SignupUserDto from "../users/dto/signup-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import SigninUserDto from "../users/dto/signin-user.dto";
import JwtUserDto from "../users/dto/jwt-user.dto";
import UserEntity from "../users/entities/user.entity";
import RefreshTokenDto from "./dto/refresh-token.dto";
import JwtTokenEntity from "./entities/jwt-token.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(JwtTokenEntity)
    private jwtTokenRepository: Repository<JwtTokenEntity>,
  ) {
  }

  public async signIn(signinUserDto: SigninUserDto) {
    const [userByEmail] = await this.usersService.findByEmail(signinUserDto.email);

    if (!userByEmail) {
      throw new HttpException("User with that credentials is not registered yet", HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.generateTokens(userByEmail);

    return {
      ...tokens,
    };
  }

  public async signUp(signupUserDto: SignupUserDto) {
    const [userByEmail] = await this.usersService.findByEmail(signupUserDto.email);

    if (userByEmail) {
      throw new HttpException("User with that credentionals already exists", HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.createUser(signupUserDto);
    const tokens = await this.generateTokens(user);

    return {
      ...tokens
    };
  }

  public async refresh(refreshTokenDto: RefreshTokenDto) {
    const {refreshToken} = refreshTokenDto;

    try {
      const verify = this.jwtService.verify<JwtUserDto>(refreshToken, {
        secret: this.configService.get("jwt_refresh_salt"),
      });

      if (verify) {
        const [tokenExist] = await this.jwtTokenRepository.find({where: {
          userId: verify.id,
          refreshToken,
        }});

        if (!tokenExist) {
          throw new HttpException("This token isn't exists", HttpStatus.BAD_REQUEST);
        }

        await this.jwtTokenRepository.remove(tokenExist);
        const [userExist] = await this.usersService.findById(verify.id);

        if (!userExist) {
          throw new HttpException("Wrong user passed in token", HttpStatus.BAD_REQUEST);
        }

        const tokens = await this.generateTokens(verify);

        return {
          ...tokens,
        };
      } else {
        throw new HttpException("Wrong token", HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException("Wrong token", HttpStatus.BAD_REQUEST);
    }
  }

  public async logout(jwtUserDto: JwtUserDto) {

  }

  private async generateTokens(user: UserEntity | JwtUserDto) {
    const jwtUser = new JwtUserDto(user);
    const plainUser = jwtUser.toPlainObject()

    const accessToken = this.jwtService.sign(plainUser, {
      secret: this.configService.get("jwt_access_salt"),
      expiresIn: "30m",
    });

    const refreshToken = this.jwtService.sign(plainUser, {
      secret: this.configService.get("jwt_refresh_salt"),
      expiresIn: "30d",
    });

    const signedAt = new Date().getTime();
    const expiredAt = new Date().getTime();

    const dbToken = this.jwtTokenRepository.create({
      userId: user.id,
      refreshToken,
      signedAt,
      expiredAt,
    });

    await this.jwtTokenRepository.insert(dbToken);

    return {
      accessToken,
      refreshToken,
    }
  }
}
