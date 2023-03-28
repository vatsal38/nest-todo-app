import { AddressDto } from './dto/address.dto';
import { LoggerService } from './../logger.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly loggerService: LoggerService,
  ) {}

  create(createUserDto: CreateUserDto) {
    let user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.address = createUserDto.address;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.role = Constants.ROLES.USER_ROLE;
    this.loggerService.log(`User created`);
    return this.userRepository.save(user);
  }

  findUserById(id: string) {
    this.loggerService.log(`Get user by id`);
    return this.userRepository.findOneOrFail({ where: { id: id } });
  }

  findAll() {
    this.loggerService.log(`Get all user`);
    return this.userRepository.find();
  }

  findUserByEmail(email: string) {
    this.loggerService.log(`Get user by email`);
    return this.userRepository.findOne({ where: { email: email } });
  }

  remove(id: string) {
    this.loggerService.log(`Delete user`);
    return this.userRepository.delete(id);
  }
}
