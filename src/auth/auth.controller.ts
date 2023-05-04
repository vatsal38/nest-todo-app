import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  UnauthorizedException,
  Get,
  Headers,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt.guard';
import { AuthService } from './auth.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiSecurity('JWT-auth')
  @Get('/check-token')
  @UseGuards(JwtAuthGuard)
  async checkToken(
    @Headers('authorization') authHeader: string,
  ): Promise<boolean> {
    const token = authHeader.split(' ')[1];
    return await this.authService.verifyToken(token);
  }

  @ApiSecurity('JWT-auth')
  @Post('/forgot-password')
  @UseGuards(JwtAuthGuard)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const resetPasswordToken =
      await this.authService.generateResetPasswordToken(forgotPasswordDto);
    return { resetPasswordToken: resetPasswordToken };
  }

  @ApiSecurity('JWT-auth')
  @Patch('reset-password/:token')
  @UseGuards(JwtAuthGuard)
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    try {
      await this.authService.resetPassword(token, resetPasswordDto);
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
