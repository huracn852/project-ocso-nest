import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    default: "user@gmail.com"
  })
  @IsEmail()
  userEmail: string;

  @ApiProperty({
    default: "password"
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  userPassword: string;

  @ApiProperty({
    default: "Employee"
  })
  @IsOptional()
  @IsIn(["Admin", "Employee", "Manager"])
  userRole: string[];
}
