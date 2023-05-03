import { PermissionsGuard } from './../auth/guard/permission.guard';
import { Permissions } from './../permission/decorators/permission.decorator';
import { JwtAuthGuard } from './../auth/guard/jwt.guard';
import { RoleGuard } from './../auth/guard/role.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiSecurity } from '@nestjs/swagger/dist/decorators';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get()
  @Permissions('a-read')
  @UseGuards(JwtAuthGuard, RoleGuard, PermissionsGuard)
  findAll() {
    return this.userService.findAll();
  }

  @ApiSecurity('JWT-auth')
  @Get(':id')
  @Permissions('a-read')
  @UseGuards(JwtAuthGuard, RoleGuard, PermissionsGuard)
  findById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @ApiSecurity('JWT-auth')
  @Patch(':id/change-permission')
  @Permissions('a-read', 'a-write')
  @UseGuards(JwtAuthGuard, RoleGuard, PermissionsGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, userData);
  }

  @ApiSecurity('JWT-auth')
  @Delete(':id')
  @Permissions('a-read', 'a-write')
  @UseGuards(JwtAuthGuard, RoleGuard, PermissionsGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
