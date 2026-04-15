import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Post', description: 'Post title' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'This is the content of my post', description: 'Post content' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ example: false, description: 'Whether the post is published' })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiProperty({ example: 1, description: 'ID of the post author (user)' })
  @IsInt()
  authorId: number;
}
