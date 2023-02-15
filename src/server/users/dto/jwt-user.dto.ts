import UserEntity from "../entities/user.entity";
import { UserRole } from "../UserRole";

export default class JwtUserDto {
  public readonly id: number;

  public readonly email: string;

  public readonly firstName: string;
  public readonly middleName: string = "";
  public readonly lastName: string;

  public readonly roles: UserRole[] = [];

  constructor(user: UserEntity | JwtUserDto) {
    this.id = user.id;

    this.email = user.email;

    this.firstName = user.firstName;
    this.middleName = user.middleName;
    this.lastName = user.lastName;

    if (user instanceof JwtUserDto) {
      this.roles = user.roles;
    } else if (user instanceof UserEntity) {
      this.roles = user.roles.map(r => r.role);
    }
  }

  public toPlainObject() {
    return JSON.parse(JSON.stringify(this));
  }
}
