import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { DatabaseService } from '../database/database.service';

describe('PostsService', () => {
  let service: PostsService;
  let databaseService: DatabaseService;

  const mockDatabaseService = {
    post: {
      create: jest.fn().mockResolvedValue({ id: 1, title: 'Test Post' }),
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, title: 'Test Post' }),
      update: jest.fn().mockResolvedValue({ id: 1, title: 'Test Post' }),
      delete: jest.fn().mockResolvedValue({ id: 1, title: 'Test Post' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a post', async () => {
      const createPostDto = { title: 'Test Post', content: 'Content', authorId: 1 };
      const result = await service.create(createPostDto);

      expect(databaseService.post.create).toHaveBeenCalledWith({
        data: createPostDto,
      });
      expect(result).toEqual({ id: 1, title: 'Test Post' });
    });
  });

  describe('findAll', () => {
    it('should return paginated posts with author', async () => {
      await service.findAll(1, 10);

      expect(databaseService.post.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        include: { author: true },
      });
    });

    it('should calculate skip correctly for page 2', async () => {
      await service.findAll(2, 10);

      expect(databaseService.post.findMany).toHaveBeenCalledWith({
        skip: 10,
        take: 10,
        include: { author: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return a post by id with author', async () => {
      const result = await service.findOne(1);

      expect(databaseService.post.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { author: true },
      });
      expect(result).toEqual({ id: 1, title: 'Test Post' });
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const updatePostDto = { title: 'Updated Title' };
      const result = await service.update(1, updatePostDto);

      expect(databaseService.post.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatePostDto,
        include: { author: true },
      });
      expect(result).toEqual({ id: 1, title: 'Test Post' });
    });
  });

  describe('remove', () => {
    it('should delete a post', async () => {
      const result = await service.remove(1);

      expect(databaseService.post.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({ id: 1, title: 'Test Post' });
    });
  });
});
