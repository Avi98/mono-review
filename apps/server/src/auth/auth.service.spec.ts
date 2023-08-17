import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { Mock } from 'ts-mockery';
import * as Password from '../utils/hash';

jest.mock('../utils/hash');
describe('AuthService', () => {
  let authService: AuthService;

  const validUser = {
    email: 'testPass@gmail.com',
    password: 'textPass1',
  };
  const inValidUser = {
    email: 'invalidUserEmail@gmail.com',
    password: 'testPass2',
  };
  const userService = Mock.of<UserService>({
    findUserByEmail: jest.fn().mockImplementation((email) => {
      if (email === validUser.email) {
        return validUser;
      }
      return inValidUser;
    }),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
      imports: [UserModule, PassportModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useClass(Repository)
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should validate user correctly', async () => {
    jest.spyOn(Password, 'verifyPassword').mockImplementation((_, userPass) => {
      if (userPass === validUser.password) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    });

    const user = await authService.validateUser(
      validUser.email,
      validUser.password,
    );
    const nullUser = await authService.validateUser(
      inValidUser.email,
      inValidUser.password,
    );

    expect(user).toBe(validUser);
    expect(nullUser).toBeNull();
  });
});
