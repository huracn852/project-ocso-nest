import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find({
      relations: { products: true },
    });
  }

  async findOne(id: string) {
    const provider = await this.providerRepository.findOne({
      where: { providerId: id },
      relations: { products: true },
    });

    return provider;
  }

  async findOneByName(name: string) {
    const provider = await this.providerRepository.findOne({
      where: {
        providerName: Like(`%${name}%`),
      },
    });

    if (!provider) {
      throw new NotFoundException(`Provider with name ${name} not found`);
    }

    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const providerToUpdate = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto,
    });

    if (!providerToUpdate) {
      throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
    }

    return this.providerRepository.save(providerToUpdate);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.providerRepository.delete({ providerId: id });

    return { message: `Proveedor con id ${id} eliminado correctamente` };
  }
}