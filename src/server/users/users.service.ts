import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import SignupUserDto from "./dto/signup-user.dto";
import UserRoleEntity from "./entities/user-role.entity";
import UserEntity from "./entities/user.entity";
import { UserRole } from "./UserRole";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity)
    private userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  public async createUser(createUserDto: SignupUserDto) {
    let userRole = this.userRoleRepository.create({
      role: UserRole.Patient,
    });

    let user = this.usersRepository.create({
      ...createUserDto,
      roles: [userRole],
    });

    await this.usersRepository.insert(user);
    return user;
  }

  public async findById(id: number) {
    return this.usersRepository.findBy({id});
  }

  public async findByEmail(email: string) {
    return this.usersRepository.find({ where: { email }, relations: { roles: true } });
  }
}
