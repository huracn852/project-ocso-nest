import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = await bcrypt.hash(createUserDto.userPassword, 5); 
    return this.userRepository.save(createUserDto);
  }
  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({ where: { userEmail: loginUserDto.userEmail } });

    if (!user) {
      throw new UnauthorizedException('No estas autorizado');
    }

    
    const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword);
    if (!match) {
      throw new UnauthorizedException('No estas autorizado');
    }

    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
    const RlolesDB = ["Admin", "Manager", "Employee"];
    const newUserData = await this.userRepository.preload({
      userEmail: userEmail,
      ...updateUserDto,
    });

    if (!newUserData) {
      throw new NotFoundException(`User with email ${userEmail} not found`);
    }

    await this.userRepository.save(newUserData);
    return newUserData;
  }
}