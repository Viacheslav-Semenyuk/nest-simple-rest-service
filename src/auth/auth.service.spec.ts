import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let databaseService: DatabaseService;
  let jwtService: JwtService;

  const mockDatabaseService = {
    user: {
      create: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
      findUnique: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com', password: 'hashedPassword' }),
    },
    refreshToken: {
      create: jest.fn().mockResolvedValue({ token: 'refresh-token' }),
      findUnique: jest.fn().mockResolvedValue({ token: 'refresh-token', expiresAt: new Date(), user: { id: 1, email: 'test@test.com' } }),
      delete: jest.fn().mockResolvedValue({}),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('access-token'),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('secret'),
  };

  beforeEach(async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto = { email: 'test@test.com', password: 'password123', name: 'Test User' };
      const result = await service.register(registerDto);

      expect(databaseService.user.create).toHaveBeenCalled();
      expect(jwtService.sign).toHaveBeenCalled();
      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const loginDto = { email: 'test@test.com', password: 'password123' };
      const result = await service.login(loginDto);

      expect(databaseService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
      });
      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
    });
  });
});
