/* eslint-disable prettier/prettier */
// import { TestingModule, Test } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { UserRepository } from '../repository/user.repository';
// import { PermissionService } from './../../permission/services/permission.service';
// import { LoggerService } from '../../utils/logger/logger.service';
// import { User } from '../entities/user.entity';
// import { CreateUserDto } from '../dto/create-user.dto';
// import { Address } from '../entities/address.entity';
// import { UserDisplayModel } from '../dto/user-display-modal';
// import { BadRequestException } from '@nestjs/common';
// import { Mapper } from '@automapper/core';

// describe('UserService', () => {
//   let userService: UserService;
//   let userRepository: UserRepository;
//   let permissionService: PermissionService;
//   let loggerService: LoggerService;
//   let mapper: Mapper;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         UserRepository,
//         PermissionService,
//         LoggerService,
//         { provide: Mapper, useValue: mapper },
//       ],
//     }).compile();

//     userService = module.get<UserService>(UserService);
//     userRepository = module.get<UserRepository>(UserRepository);
//     permissionService = module.get<PermissionService>(PermissionService);
//     loggerService = module.get<LoggerService>(LoggerService);
//     mapper = module.get<Mapper>(Mapper);
//   });

//   describe('create', () => {
//     const createUserDto: CreateUserDto = {
//       email: 'vatsal@gmail.com',
//       password: 'vatsal',
//       firstName: 'vatsal',
//       lastName: 'mavani',
//       address: {
//         street: '123 Street',
//         city: 'City',
//         state: 'State',
//         zipcode: 12345,
//       },
//     };

//     it('should create a new user', async () => {
//       const existingUser = null;
//       const hashedPassword = 'hashedPassword';
//       const newUserAddress = new Address(
//         'addressId',
//         createUserDto.address.street,
//         createUserDto.address.city,
//         createUserDto.address.state,
//         createUserDto.address.zipcode,
//         null,
//       );
//       const newUser = new User(
//         '1',
//         createUserDto.firstName,
//         createUserDto.lastName,
//         createUserDto.email,
//         newUserAddress,
//         hashedPassword,
//         null,
//         null,
//         'user',
//         [],
//         null,
//       );

//       const setUserPermissionSpy = jest
//         .spyOn(permissionService, 'setUserPermission')
//         .mockResolvedValue([]);

//       const findUserByEmailSpy = jest
//         .spyOn(userRepository, 'findUserByEmail')
//         .mockResolvedValue(existingUser);

//       const hashSpy = jest
//         .spyOn(userService['bcrypt'], 'hash')
//         .mockResolvedValue(hashedPassword);

//       const createUserSpy = jest
//         .spyOn(userRepository, 'createUser')
//         .mockResolvedValue(newUser);

//       const loggerServiceLogSpy = jest.spyOn(loggerService, 'log');

//       const mapSpy = jest.spyOn(mapper, 'map');

//       const result: UserDisplayModel = await userService.create(createUserDto);

//       expect(setUserPermissionSpy).toHaveBeenCalled();
//       expect(findUserByEmailSpy).toHaveBeenCalledWith(createUserDto.email);
//       expect(hashSpy).toHaveBeenCalledWith(createUserDto.password, 10);
//       expect(createUserSpy).toHaveBeenCalledWith(newUser);
//       expect(loggerServiceLogSpy).toHaveBeenCalledWith('User created');
//       expect(mapSpy).toHaveBeenCalledWith(newUser, UserDisplayModel);
//       expect(result).toBeDefined();
//       expect(result.id).toEqual(newUser.id);
//       expect(result.firstName).toEqual(newUser.firstName);
//       expect(result.lastName).toEqual(newUser.lastName);
//       expect(result.email).toEqual(newUser.email);
//       expect(result.address).toEqual(newUser.address);
//     });

//     it('should throw BadRequestException if email is not provided', async () => {
//       const createUserDtoWithoutEmail: CreateUserDto = {
//         ...createUserDto,
//         email: '',
//       };

//       await expect(
//         userService.create(createUserDtoWithoutEmail),
//       ).rejects.toThrowError(`${BadRequestException} : Email is required.`);
//     });
//   });
// });
