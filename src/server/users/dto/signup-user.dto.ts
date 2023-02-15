import { ApiProperty } from "@nestjs/swagger";

export default class SignupUserDto {
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

  @ApiProperty({
    description: "User`s first name",
    example: "John",
  })
  firstName: string;

  @ApiProperty({
    description: "User`s last name",
    example: "Titor",
  })
  lastName: string;
}
