import { PermissionRepository } from './../permission/permission.repository';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Constants } from 'src/utils/constants';
import { BadRequestException, Inject } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(PermissionRepository)
    private readonly permissionRepository: PermissionRepository,
  ) {}
  async createUser(userData: CreateUserDto) {
    const { email, password, firstName, address, lastName } = userData;
    const user = new User();
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.address = address;
    user.role = Constants.ROLES.USER_ROLE;
    user.permissions = await this.permissionRepository.setUserPermission();
    return await this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findUserById(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async removeUser(id: string) {
    return await this.userRepository.delete(id);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findToken(resetPasswordToken: string) {
    return await this.userRepository.findOne({
      where: { resetPasswordToken: resetPasswordToken },
    });
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      return null;
    }
    const {
      email,
      password,
      firstName,
      lastName,
      isVerified,
      resetPasswordExpires,
      resetPasswordToken,
      updatePermission,
    } = userData;
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.isVerified = isVerified;
    user.resetPasswordExpires = resetPasswordExpires;
    user.resetPasswordToken = resetPasswordToken;

    const validPermissions = await this.permissionRepository.allPermission();
    const hasInvalidPermissions = updatePermission.some(
      (permission) => !validPermissions.includes(permission),
    );
    if (hasInvalidPermissions) {
      throw new BadRequestException('Invalid permission values');
    }
    if (updatePermission) {
      user.permissions = updatePermission;
    }
    return await this.userRepository.save(user);
  }
}
