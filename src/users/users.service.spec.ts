import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from '../database/database.service';

describe('UsersService', () => {
  let service: UsersService;
  let databaseService: DatabaseService;

  const mockDatabaseService = {
    user: {
      create: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
      update: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
      delete: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = { email: 'test@test.com', password: 'password123', name: 'Test User' };
      const result = await service.create(createUserDto);

      expect(databaseService.user.create).toHaveBeenCalledWith({
        data: createUserDto,
      });
      expect(result).toEqual({ id: 1, email: 'test@test.com' });
    });
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      await service.findAll(1, 10);

      expect(databaseService.user.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });

    it('should calculate skip correctly for page 2', async () => {
      await service.findAll(2, 10);

      expect(databaseService.user.findMany).toHaveBeenCalledWith({
        skip: 10,
        take: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = await service.findOne(1);

      expect(databaseService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({ id: 1, email: 'test@test.com' });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { name: 'Updated Name' };
      const result = await service.update(1, updateUserDto);

      expect(databaseService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto,
      });
      expect(result).toEqual({ id: 1, email: 'test@test.com' });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = await service.remove(1);

      expect(databaseService.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({ id: 1, email: 'test@test.com' });
    });
  });
});
