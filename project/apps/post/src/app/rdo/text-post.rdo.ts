import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from './post.rdo';

export class TextPostRdo extends PostRdo {
  @ApiProperty({
    description: 'Post title',
    example: 'Useful tips for NestJS beginners',
  })
  @Expose()
  public title!: string;

  @ApiProperty({
    description: 'Post announcement',
    example:
      'In this post we discuss useful patterns and practices for NestJS beginners and beyond.',
  })
  @Expose()
  public announcement!: string;

  @ApiProperty({
    description: 'Post text',
    example:
      'Full publication text goes here and must contain at least one hundred characters to meet the project requirements for text posts.',
  })
  @Expose()
  public text!: string;
}
