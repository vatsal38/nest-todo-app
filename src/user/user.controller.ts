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
import { Constants } from 'src/utils/constants';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiSecurity } from '@nestjs/swagger/dist/decorators';

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
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findAll() {
    return this.userService.findAll();
  }

  @ApiSecurity('JWT-auth')
  @Delete(':userId')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  remove(@Param('userId') id: string) {
    return this.userService.remove(id);
  }
}
