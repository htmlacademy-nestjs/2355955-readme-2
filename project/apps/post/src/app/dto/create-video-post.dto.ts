import { ApiProperty } from '@nestjs/swagger';
import { CreatePostBaseDto } from './create-post-base.dto';

export class CreateVideoPostDto extends CreatePostBaseDto {
  @ApiProperty({
    description: 'Post title',
    example: 'How to build NestJS REST API',
    minLength: 20,
    maxLength: 50,
  })
  public title!: string;

  @ApiProperty({
    description: 'YouTube video URL',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  public videoUrl!: string;
}
