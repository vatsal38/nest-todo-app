import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger/dist';
import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { Body } from '@nestjs/common/decorators';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req , @Body() loginDto:LoginDto) {
    const user: User = req.user;
    const payload = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    return { token: this.jwtService.sign(payload) };
  }
}
