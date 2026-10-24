  import { Injectable, NotFoundException } from '@nestjs/common';
  import { CreateLocationDto } from './dto/create-location.dto';
  import { UpdateLocationDto } from './dto/update-location.dto';
  import { Repository } from 'typeorm';
  import { Location } from './entities/location.entity';
  import { Manager } from '../managers/entities/manager.entity';
  import { InjectRepository } from '@nestjs/typeorm';

  @Injectable()
  export class LocationsService {
    constructor(
      @InjectRepository(Location)
      private readonly locationRepository: Repository<Location>,
      @InjectRepository(Manager)
      private readonly managerRepository: Repository<Manager>,
    ) {}

    async create(createLocationDto: CreateLocationDto) {
      const { managerId, ...locationData } = createLocationDto;
      const location = this.locationRepository.create(locationData);
      const savedLocation = await this.locationRepository.save(location);

      if (managerId) {
        const manager = await this.managerRepository.findOneBy({ managerId });

        if (!manager) {
          throw new NotFoundException('Manager not found');
        }

        manager.location = savedLocation;
        await this.managerRepository.save(manager);
      }

      return this.locationRepository.findOne({
        where: { locationId: savedLocation.locationId },
        relations: { manager: true },
      });
    }

    findAll() {
      return this.locationRepository.find({
        relations: { manager: true },
      });
    }

    async findOne(id: number) {
      const location = await this.locationRepository.findOne({
        where: { locationId: id },
        relations: { manager: true },
      });

      if (!location) {
        throw new NotFoundException('Location not found');
      }

      return location;
    }

    async update(id: number, updateLocationDto: UpdateLocationDto) {
      const { managerId, ...locationData } = updateLocationDto;
      const locationToUpdate = await this.locationRepository.preload({
        locationId: id,
        ...locationData,
      });

      if (!locationToUpdate) {
        throw new NotFoundException('Location not found');
      }

      const updatedLocation = await this.locationRepository.save(locationToUpdate);

      if (managerId) {
        const manager = await this.managerRepository.findOneBy({ managerId });

        if (!manager) {
          throw new NotFoundException('Manager not found');
        }

        manager.location = updatedLocation;
        await this.managerRepository.save(manager);
      }

      return this.locationRepository.findOne({
        where: { locationId: updatedLocation.locationId },
        relations: { manager: true },
      });
    }

    async remove(id: number) {
      await this.findOne(id);

      return this.locationRepository.delete({
        locationId: id,
      });
    }
  }
