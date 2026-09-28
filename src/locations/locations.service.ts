  import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
  import { CreateLocationDto } from './dto/create-location.dto';
  import { UpdateLocationDto } from './dto/update-location.dto';
  import {Repository } from 'typeorm';
  import { Location } from './entities/location.entity';
  import { InjectRepository } from '@nestjs/typeorm';

  @Injectable()
  export class LocationsService {
    constructor(
      @InjectRepository(Location)
      private locationRepository: Repository<Location>
    ) {}
    create(createLocationDto: CreateLocationDto) {
      return this.locationRepository.save(createLocationDto);
    }

    findAll() {
      return this.locationRepository.find();
    }

    async findOne(id: number) {
      const location = await this.locationRepository.findOneBy({
        locationId: id,
      })
      if (!location) throw new NotFoundException("Location not found")
      return location;
    }

    async update(id: number, updateLocationDto: UpdateLocationDto) {
      const location = await this.locationRepository.preload({
        locationId: id,
        ...updateLocationDto
      })
      if (!location) throw new BadRequestException("Location not found")
      return this.locationRepository.save(location)
    }

    remove(id: number) {
      return this.locationRepository.delete({
        locationId: id
      })
    }
  }
