import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import JwtUserDto from "../users/dto/jwt-user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.jwt_access_salt,
    });
  }

  public async validate(payload: any) {
    return new JwtUserDto(payload);
  }
}
