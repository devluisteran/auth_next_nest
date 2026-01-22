import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){

  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findByEmailIncludingDeleted(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .withDeleted() 
      .where('user.email = :email', { email })
      .getOne();
  }

  async findByEmail(email: string){
    const userFound = await this.userRepository.findOneBy({email});

    return userFound;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userUpdated = await this.userRepository.update({id,deletedAt: IsNull()}, updateUserDto);
    if(userUpdated.affected === 0){
      throw new NotFoundException("User not found");
    }
    return this.userRepository.findOneBy({id});
  }

  async remove(id: number) {
   const userDeleted = await this.userRepository.softDelete(id);
   if((userDeleted).affected === 0){
    throw new NotFoundException("User not found");
   }

   return userDeleted;
  }
}
