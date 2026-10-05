import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Employee {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @PrimaryGeneratedColumn('uuid')
  employeeId: string;

  @ApiProperty({ example: 'Ana' })
  @Column('text')
  employeeName: string;

  @ApiProperty({ example: 'García López' })
  @Column('text')
  employeeLastName: string;

  @ApiProperty({ example: '4421234567' })
  @Column('text')
  employeePhoneNumber: string;

  @ApiProperty({ example: 'ana.garcia@example.com' })
  @Column('text', { unique: true })
  employeeEmail: string;

  @ApiPropertyOptional({ example: 'https://example.com/photos/ana.jpg', nullable: true })
  @Column({
    type: 'text',
    nullable: true,
  })
  employeePhoto: string;

  @ApiPropertyOptional({ type: () => Location })
  @ManyToOne(() => Location, (location) => location.employees)
  @JoinColumn({
    name: 'locationId',
  })
  location: Location;

  @ApiPropertyOptional({ type: () => User })
  @OneToOne(() => User)
  @JoinColumn({
    name: 'userId',
  })
  user: User;
}
