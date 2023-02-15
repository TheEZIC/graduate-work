import { ApiProperty } from "@nestjs/swagger";

export default class LoginUserDto {
  @ApiProperty({
    description: "User`s email",
    example: "myemail@gmail.com",
  })
  email: string;

  @ApiProperty({
    description: "User`s password",
    example: "password12345",
  })
  password: string;
}
