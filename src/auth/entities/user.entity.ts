import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @Column('text')
    userEmail: string;
    @Column('text')
    userPassword: string;
    @Column('simple-array', { 
        default: "Employee"
    })
    userRoles: string[];
}