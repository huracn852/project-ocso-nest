import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  create(createManagerDto: CreateManagerDto) {
    const { location, ...managerData } = createManagerDto;

    const manager = this.managerRepository.create({
      ...managerData,
      ...(location && { location: { locationId: location.locationId } }),
    });

    return this.managerRepository.save(manager);
  }

  findAll() {
    return this.managerRepository.find({
      relations: { location: true },
    });
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOne({
      where: { managerId: id },
      relations: { location: true },
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const { location, ...managerData } = updateManagerDto;
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...managerData,
      ...(location && { location: { locationId: location.locationId } }),
    });

    if (!managerToUpdate) {
      throw new NotFoundException('Manager not found');
    }

    return this.managerRepository.save(managerToUpdate);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.managerRepository.delete({
      managerId: id,
    });
  }
}
