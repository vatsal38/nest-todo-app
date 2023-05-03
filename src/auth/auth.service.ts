import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';

import { JwtService } from '@nestjs/jwt';

import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userService.findUserByEmail(data.email);
    const payload = { email: user.email, role: user.role };
    return { token: this.jwtService.sign(payload) };
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userService.findUserByEmail(decoded.email);
      user.isVerified = true;
      await user.save();
      return !!decoded;
    } catch (error) {
      return false;
    }
  }

  async generateResetPasswordToken(data: ForgotPasswordDto): Promise<string> {
    const user = await this.userService.findUserByEmail(data.email);
    if (!user) {
      throw new Error('User not found');
    }
    const payload = { id: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    const expirationTime = new Date(Date.now() + 3600 * 1000);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expirationTime;
    await user.save();
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
    user.password = resetPasswordDto.newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.isVerified = false;
    await user.save();
    return 'Password is changed';
  }
}
