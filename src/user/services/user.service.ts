import { PermissionService } from './../../permission/services/permission.service';
import { PermissionRepository } from './../../permission/repository/permission.repository';
import { Constants } from './../../utils/constants';
import { hash } from 'bcrypt';
import { LoggerService } from '../../utils/logger/logger.service';
import {
  Inject,
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UserDisplayModel } from '../dto/user-display-modal';
import { v4 as uuid } from 'uuid';
import { Address } from '../entities/address.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly permissionService: PermissionService,
    private readonly loggerService: LoggerService,
    @Inject(PermissionRepository)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDisplayModel> {
    const { email, password, firstName, lastName, address } = createUserDto;
    if (!email) {
      throw new BadRequestException('Email is required.');
    }
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email is already in use.');
    }
    const hashedPassword = await hash(password, 10);
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.address = new Address(
      uuid(),
      address.street,
      address.city,
      address.state,
      address.zipcode,
    );
    newUser.password = hashedPassword;
    newUser.role = Constants.ROLES.USER_ROLE;
    newUser.permissions = await this.permissionService.setUserPermission();

    const mappedUser = await this.userRepository.createUser(newUser);
    const user = this.mapper.map(mappedUser, User, UserDisplayModel);
    this.loggerService.log(`User created`);
    return user;
  }

  async findAll(): Promise<User[]> {
    this.loggerService.log(`Get all user`);
    return await this.userRepository.findAll();
  }

  async findUserById(id: string): Promise<User> {
    this.loggerService.log(`Get user by id : ${id}`);
    return await this.userRepository.findUserById(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    this.loggerService.log(`Get user by email : ${email}`);
    return await this.userRepository.findUserByEmail(email);
  }

  async findByResetPasswordToken(resetPasswordToken: string): Promise<User> {
    this.loggerService.log(`Get reset password token`);
    return await this.userRepository.findToken(resetPasswordToken);
  }

  async remove(id: string): Promise<any> {
    this.loggerService.log(`Delete user : ${id}`);
    return await this.userRepository.removeUser(id);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      return null;
    }
    const { resetPasswordExpires, resetPasswordToken, permissions } =
      updateUserDto;
    user.resetPasswordExpires = resetPasswordExpires;
    user.resetPasswordToken = resetPasswordToken;

    const validPermissions = await this.permissionRepository.allPermission();
    const hasInvalidPermissions = permissions.some(
      (permission) => !validPermissions.includes(permission),
    );
    if (hasInvalidPermissions) {
      throw new BadRequestException('Invalid permission values');
    }
    if (permissions) {
      user.permissions = permissions;
    }
    this.loggerService.log(`Update user which id : ${id}`);
    return await this.userRepository.updateUser(user);
  }
}
