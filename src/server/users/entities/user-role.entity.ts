import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../UserRole";
import UserEntity from "./user.entity";

@Entity()
export default class UserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
  })
  role: UserRole;

  @ManyToOne(() => UserEntity, (user) => user.roles)
  user: UserEntity;
}
