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
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll() {
    return this.userService.findAll();
  }

  @ApiSecurity('JWT-auth')
  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @ApiSecurity('JWT-auth')
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, userData);
  }

  @ApiSecurity('JWT-auth')
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
