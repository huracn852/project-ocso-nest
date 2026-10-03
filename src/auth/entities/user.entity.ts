import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Manager } from '../../managers/entities/manager.entity';

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

    @OneToOne(() => Manager, {eager: true})
    manager: Manager;

    @OneToOne(() => Employee, {eager: true})
    employee: Employee;
}