import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostType } from '@project/types';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post type',
    enum: PostType,
    example: PostType.Video,
  })
  public type!: PostType;

  @ApiPropertyOptional({
    description: 'Post tags',
    example: ['nestjs', 'backend'],
    isArray: true,
    type: String,
  })
  public tags?: string[];

  @ApiPropertyOptional({
    description: 'Post title',
    example: 'How to build NestJS REST API',
  })
  public title?: string;

  @ApiPropertyOptional({
    description: 'YouTube video URL',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  public videoUrl?: string;

  @ApiPropertyOptional({
    description: 'Post announcement',
  })
  public announcement?: string;

  @ApiPropertyOptional({
    description: 'Post text',
  })
  public text?: string;

  @ApiPropertyOptional({
    description: 'Quote text',
  })
  public quote?: string;

  @ApiPropertyOptional({
    description: 'Quote author',
  })
  public author?: string;

  @ApiPropertyOptional({
    description: 'Photo file path',
    example: '/uploads/photo.jpg',
  })
  public photoPath?: string;

  @ApiPropertyOptional({
    description: 'Link URL',
    example: 'https://nestjs.com',
  })
  public link?: string;

  @ApiPropertyOptional({
    description: 'Link description',
  })
  public description?: string;
}
