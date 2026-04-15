import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let postsService: PostsService;

  const mockPostsService = {
    create: jest.fn().mockResolvedValue({ id: 1, title: 'Test Post' }),
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Test Post' }),
    update: jest.fn().mockResolvedValue({ id: 1, title: 'Test Post' }),
    remove: jest.fn().mockResolvedValue({ id: 1, title: 'Test Post' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call postsService.findAll', async () => {
      await controller.findAll();

      expect(postsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call postsService.findOne', async () => {
      await controller.findOne('1');

      expect(postsService.findOne).toHaveBeenCalledWith(1);
    });
  });
});
