import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Ana' })
  @IsString()
  @MaxLength(30)
  employeeName: string;

  @ApiProperty({ example: 'García López' })
  @IsString()
  @MaxLength(70)
  employeeLastName: string;

  @ApiProperty({ example: '4421234567' })
  @IsString()
  @MaxLength(10)
  employeePhoneNumber: string;

  @ApiProperty({ example: 'ana.garcia@example.com' })
  @IsString()
  @IsEmail()
  employeeEmail: string;

  @ApiPropertyOptional({
    description: 'Ubicación asignada al empleado',
    example: { locationId: 1 },
  })
  @IsOptional()
  @IsObject()
  location?: {
    locationId: number;
  };
}
