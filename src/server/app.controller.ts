import { Controller, Get, Render, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./auth/jwt.guard";
import { Roles } from "./auth/roles.decorator";
import { UserRole } from "./users/UserRole";
import { RolesGuard } from "./auth/roles.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  public index() {
    return {};
  }

  @Get("test")
  @Render('test')
  public test() {
    return {
      title: "my title"
    };
  }

  @Get("test-auth")
  @UseGuards(JwtAuthGuard)
  public testAuth(@Request() request): any {
    return request.user;
  }

  @Get("test-admin")
  @UseGuards(RolesGuard)
  @Roles(UserRole.Admin)
  public testAdmin(@Request() req) {
    console.log(req.user);
    return "You are admin";
  }
}
