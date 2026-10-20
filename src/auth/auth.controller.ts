import { Controller, Post, Body, Patch, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import {
  JWT_COOKIE_MAX_AGE,
  TOKEN_NAME,
} from './constants/jwt.constants';

@ApiTags('Employees')


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.loginUser(loginUserDto);

    const isProduction = process.env.NODE_ENV === 'production';
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction,
      maxAge: JWT_COOKIE_MAX_AGE,
    });
    return { message: 'Login successful' };
  }
  @Patch("/:email")
  updateUser(@Param("email") userEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}