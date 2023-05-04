import {
  Controller,
  Post,
  Body,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const resetPasswordToken =
      await this.authService.generateResetPasswordToken(forgotPasswordDto);
    return { resetPasswordToken: resetPasswordToken };
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<any> {
    try {
      await this.authService.resetPassword(token, resetPasswordDto);
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
    return { password: 'Password is changed' };
  }
}
