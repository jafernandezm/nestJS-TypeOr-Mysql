import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-active-interface';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}


  async create(createCatDto: CreateCatDto, user: UserActiveInterface ) {
    const breed = await this.breedRepository.findOneBy({ name : createCatDto.breed});
    if(!breed){
      throw new BadRequestException(`Breed ${createCatDto.breed} not found`);
    }
    console.log(user);
    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
      userEmail: user.email,
    });
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    
    //return await this.catRepository.update(id, updateCatDto);
    
  }

  async remove(id: number) {
    //return await this.catRepository.delete(id);
    return await this.catRepository.softDelete(id); //solo muestra los que no estan eliminados
  }

  
}
