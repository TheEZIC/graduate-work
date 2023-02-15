import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import UserRoleEntity from "./user-role.entity";

@Entity()
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    unique: true
  })
  email: string;

  @Column({
    type: "text",
  })
  password: string;

  @Column({
    type: "text",
  })
  firstName: string;

  @Column({
    type: "text",
    nullable: true,
  })
  middleName?: string;

  @Column({
    type: "text",
  })
  lastName: string;

  @OneToMany(() => UserRoleEntity, (role) => role.user)
  roles: UserRoleEntity[];
}
