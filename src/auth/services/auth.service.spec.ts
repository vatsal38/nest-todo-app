/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../../utils/logger/logger.service';
import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { compare, hash } from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService, LoggerService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    loggerService = moduleRef.get<LoggerService>(LoggerService);
  });

  describe('login', () => {
    it('should return a token when valid email and password are provided', async () => {
      const email = 'vatsal@gmail.com';
      const password = 'vatsal';
      const user = {
        email: 'vatsal@gmail.com',
        password: await hash(password, 10),
        role: 'user',
        id: '12345',
      };
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(user);
      jest.spyOn(compare, 'compare').mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('token');
      jest.spyOn(loggerService, 'log');

      const loginDto: LoginDto = { email, password };
      const result = await authService.login(loginDto);

      expect(userService.findUserByEmail).toHaveBeenCalledWith(email);
      expect(compare.compare).toHaveBeenCalledWith(password, user.password);
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: user.email,
        role: user.role,
        id: user.id,
      });
      expect(loggerService.log).toHaveBeenCalledWith(`${user.email} logged in`);
      expect(result).toEqual({ token: 'token' });
    });

    it('should throw BadRequestException when email or password is missing', async () => {
      const loginDto: LoginDto = { email: '', password: 'vatsal' };

      await expect(authService.login(loginDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw UnauthorizedException when invalid email or password is provided', async () => {
      const email = 'vatsal@gmail.com';
      const password = 'vatsal';
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(null);

      const loginDto: LoginDto = { email, password };

      await expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('generateResetPasswordToken', () => {
    it('should generate a reset password token and update the user', async () => {
      const email = 'vatsal@gmail.com';
      const user: any = {
        email,
        save: jest.fn().mockResolvedValueOnce(undefined),
      };

      const forgotPasswordDto: ForgotPasswordDto = { email };
      const token = 'reset-token';
      const expirationTime = new Date(Date.now() + 3600 * 1000);
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(user);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(token);
      jest.spyOn(Date, 'now').mockReturnValueOnce(1234567890);
      jest.spyOn(loggerService, 'log');

      const result = await authService.generateResetPasswordToken(
        forgotPasswordDto,
      );

      expect(userService.findUserByEmail).toHaveBeenCalledWith(email);
      expect(jwtService.sign).toHaveBeenCalledWith(
        { email: user.email },
        { expiresIn: '1h' },
      );
      expect(Date.now).toHaveBeenCalled();
      expect(user.resetPasswordToken).toBe(token);
      expect(user.resetPasswordExpires).toEqual(expirationTime);
      expect(user.save).toHaveBeenCalled();
      expect(loggerService.log).toHaveBeenCalledWith(
        'Reset password token generated',
      );
      expect(result).toBe(token);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const email = 'vatsal@gmail.com';
      const forgotPasswordDto: ForgotPasswordDto = { email };
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(null);

      await expect(
        authService.generateResetPasswordToken(forgotPasswordDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('resetPassword', () => {
    it('should reset the password when valid token and new password are provided', async () => {
      const resetPasswordToken = 'reset-token';
      const user: any = {
        resetPasswordToken,
        resetPasswordExpires: new Date(1234567890),
        save: jest.fn().mockResolvedValueOnce(null),
      };

      const resetPasswordDto: ResetPasswordDto = {
        newPassword: 'newPassword123',
      };
      jest
        .spyOn(userService, 'findByResetPasswordToken')
        .mockResolvedValueOnce(user);
      jest.spyOn(Date, 'now').mockReturnValueOnce(1234567890);
      jest.spyOn(hash, 'hash').mockResolvedValueOnce('hashedPassword');
      jest.spyOn(loggerService, 'log');

      await authService.resetPassword(resetPasswordToken, resetPasswordDto);

      expect(userService.findByResetPasswordToken).toHaveBeenCalledWith(
        resetPasswordToken,
      );
      expect(Date.now).toHaveBeenCalled();
      expect(hash.hash).toHaveBeenCalledWith(resetPasswordDto.newPassword, 10);
      expect(user.password).toBe('hashedPassword');
      expect(user.resetPasswordToken).toBeNull();
      expect(user.resetPasswordExpires).toBeNull();
      expect(user.save).toHaveBeenCalled();
      expect(loggerService.log).toHaveBeenCalledWith(
        'Password has been changed',
      );
    });

    it('should throw an error when invalid or expired token is provided', async () => {
      const resetPasswordToken = 'reset-token';
      jest
        .spyOn(userService, 'findByResetPasswordToken')
        .mockResolvedValueOnce(null);

      await expect(
        authService.resetPassword(resetPasswordToken, {
          newPassword: 'newvatsal',
        }),
      ).rejects.toThrowError('Invalid or expired token');
    });

    it('should throw an error when current time is greater than the expiration time', async () => {
      const resetPasswordToken = 'reset-token';
      const user = {
        resetPasswordToken,
        resetPasswordExpires: new Date(1234567890),
      };
      jest
        .spyOn(userService, 'findByResetPasswordToken')
        .mockResolvedValueOnce(user);
      jest.spyOn(Date, 'now').mockReturnValueOnce(9876543210);

      await expect(
        authService.resetPassword(resetPasswordToken, {
          newPassword: 'newvatsal',
        }),
      ).rejects.toThrowError('Invalid or expired token');
    });
  });
});
