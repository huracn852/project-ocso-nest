import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import type {} from 'multer';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { ROLES } from '../auth/constants/roles.constants';
import { ApiAuth } from '../auth/decorators/apidecorator';

@ApiAuth()
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth(ROLES.MANAGER)
  @Post()
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        employeeId: 'UUID',
        employeeName: 'Andres',
        employeeLastName: 'Reyes',
        employeePhoneNumber: '4428654433',
        employeeEmail: 'andres@gmail.com',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Missing or invalid token'
  })
  @ApiResponse({
    status: 403,
    description: 'Missing role'
  })

  @ApiResponse({
    status: 500,
    description: 'Server error'
  })

  @Post('upload')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Get('location/:id')
  findAllLocation(@Param('id') id: string) {
    return this.employeesService.findAllLocation(Number(id));
  }

  @Auth(ROLES.EMPLOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.remove(id);
  }
}