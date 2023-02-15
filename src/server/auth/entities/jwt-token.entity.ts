import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class JwtTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "int",
  })
  userId: number;

  @Column({
    type: "text",
  })
  refreshToken: string;

  @Column({
    type: "date",
  })
  signedAt: Date;

  @Column({
    type: "date",
  })
  expiredAt: Date;
}
