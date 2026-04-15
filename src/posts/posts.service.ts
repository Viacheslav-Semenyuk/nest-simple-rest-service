import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createPostDto: CreatePostDto) {
    return this.databaseService.post.create({
      data: createPostDto,
    });
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.databaseService.post.findMany({
      skip,
      take: limit,
      include: { author: true },
    });
  }

  findOne(id: number) {
    return this.databaseService.post.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.databaseService.post.update({
      where: { id },
      data: updatePostDto,
      include: { author: true },
    });
  }

  remove(id: number) {
    return this.databaseService.post.delete({
      where: { id },
    });
  }
}
