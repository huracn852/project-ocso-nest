import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { location, ...employeeData } = createEmployeeDto;

    const employee = this.employeeRepository.create({
      ...employeeData,
      ...(location && {
        location: {
          locationId: location.locationId,
        },
      }),
    } as any);

    return this.employeeRepository.save(employee);
  }

  findAll() {
    return this.employeeRepository.find({
      relations: {
        location: true,
      },
    });
  }

  findAllLocation(id: number) {
    return this.employeeRepository.find({
      where: {
        location: {
          locationId: id,
        },
      },
      relations: {
        location: true,
      },
    });
  }

  findOne(id: string) {
    return this.employeeRepository.findOne({
      where: { employeeId: id },
      relations: {
        location: true,
      },
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const { location: employeeLocation, ...employeeData } = updateEmployeeDto;

    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...employeeData,
      ...(employeeLocation && {
        location: {
          locationId: employeeLocation.locationId,
        },
      }),
    });

    if (!employeeToUpdate) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }

    return this.employeeRepository.save(employeeToUpdate);
  }

  async remove(id: string) {
    await this.employeeRepository.delete({ employeeId: id });
    return { message: 'Empleado eliminado correctamente' };
  }
}