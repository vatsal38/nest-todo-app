import { LoggerService } from './../logger.service';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { compare } from 'bcrypt';
import { hash } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  async login(data: LoginDto) {
    if (!data.email || !data.password) {
      throw new BadRequestException('Email and password are required.');
    }
    const user = await this.userService.findUserByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    const isPasswordValid = await compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    const payload = {
      email: user.email,
      role: user.role,
      id: user.id,
    };
    this.loggerService.log(`${user.email} logged in`);
    return { token: this.jwtService.sign(payload) };
  }

  async generateResetPasswordToken(data: ForgotPasswordDto): Promise<string> {
    const user = await this.userService.findUserByEmail(data.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const payload = { email: user.email };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    const expirationTime = new Date(Date.now() + 3600 * 1000);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expirationTime;
    await user.save();
    this.loggerService.log(`Reset password token generated`);
    return token;
  }

  async resetPassword(
    resetPasswordToken: string,
    resetPasswordDto: ResetPasswordDto,
  ) {
    const user = await this.userService.findByResetPasswordToken(
      resetPasswordToken,
    );
    if (!user) {
      throw new Error('Invalid or expired token');
    }
    const currentTime = new Date();
    if (currentTime > user.resetPasswordExpires) {
      throw new Error('Invalid or expired token');
    }
    const hashedPassword = await hash(resetPasswordDto.newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    this.loggerService.log(`Password has been changed`);
    await user.save();
  }
}
