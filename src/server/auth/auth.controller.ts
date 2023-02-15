import { Controller, Post, Body } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import SignupUserDto from "../users/dto/signup-user.dto";
import { AuthService } from "./auth.service";
import SigninUserDto from "../users/dto/signin-user.dto";
import RefreshTokenDto from "./dto/refresh-token.dto";

@ApiTags("Authorization")
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {
  }

  @Post("signin")
  @ApiOperation({
    summary: "Authorize existed user",
    description: "Authorize user by email and password",
  })
  public signIn(
    @Body()
    signinUserDto: SigninUserDto,
  ) {
    return this.authService.signIn(signinUserDto);
  }

  @Post("signup")
  @ApiOperation({
    summary: "Register new user",
    description: "Register new user in system via email and password",
  })
  public signUp(
    @Body()
    signupUserDto: SignupUserDto,
  ) {
    return this.authService.signUp(signupUserDto);
  }

  @Post("refresh")
  @ApiOperation({
    summary: "Refresh user's token",
    description: "Refresh user's jwt token and send new tokens",
  })
  public refresh(
    @Body()
    refreshTokenDto: RefreshTokenDto,
  ) {
    return this.authService.refresh(refreshTokenDto);
  }
}
