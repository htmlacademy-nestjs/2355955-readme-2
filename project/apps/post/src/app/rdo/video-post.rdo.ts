import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from './post.rdo';

export class VideoPostRdo extends PostRdo {
  @ApiProperty({
    description: 'Post title',
    example: 'How to build NestJS REST API',
  })
  @Expose()
  public title!: string;

  @ApiProperty({
    description: 'YouTube video URL',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
  @Expose()
  public videoUrl!: string;
}
