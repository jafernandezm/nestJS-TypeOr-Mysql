import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>, // Esto es para inyectar el repositorio de la entidad Breed en el servicio de Breeds y poder usarlo en los métodos del servicio de Breeds 
    // es un patron de diseño que se llama inyección de dependencias
  ) {

  }
  async create(createBreedDto: CreateBreedDto) {
    return await this.breedRepository.save(createBreedDto);
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async findOne(id: number) {
    return await this.breedRepository.findOneBy({id});
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    return await this.breedRepository.update(id, updateBreedDto);
  }

  async remove(id: number) {
    return await this.breedRepository.softDelete(id);
  }
}
