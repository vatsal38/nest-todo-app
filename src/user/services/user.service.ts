import { LoggerService } from '../../utils/logger/logger.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  async findAll() {
    this.loggerService.log(`Get all user`);
    return await this.userRepository.findAll();
  }

  async findUserById(id: string) {
    this.loggerService.log(`Get user by id : ${id}`);
    return await this.userRepository.findUserById(id);
  }

  async findUserByEmail(email: string) {
    this.loggerService.log(`Get user by email : ${email}`);
    return await this.userRepository.findUserByEmail(email);
  }

  async findByResetPasswordToken(resetPasswordToken: string): Promise<User> {
    this.loggerService.log(`Get reset password token`);
    return this.userRepository.findToken(resetPasswordToken);
  }

  async remove(id: string) {
    this.loggerService.log(`Delete user : ${id}`);
    return await this.userRepository.removeUser(id);
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    this.loggerService.log(`Update user which id : ${id}`);
    return await this.userRepository.updateUser(id, userData);
  }
}
