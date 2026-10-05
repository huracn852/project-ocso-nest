import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateManagerDto {
  @ApiProperty({ example: 'Ana García López' })
  @IsString()
  @MaxLength(80)
  managerFullName: string;

  @ApiProperty({ example: 'ana.garcia@example.com' })
  @IsString()
  @IsEmail()
  managerEmail: string;

  @ApiProperty({ example: 25000 })
  @IsNumber()
  managerSalary: number;

  @ApiProperty({ example: '4421234567890123' })
  @IsString()
  @MaxLength(16)
  managerPhoneNumber: string;

  @ApiPropertyOptional({
    description: 'Ubicación asignada al gerente',
    example: { locationId: 1 },
  })
  @IsOptional()
  @IsObject()
  location?: {
    locationId: number;
  };
}