import { ApiProperty } from '@nestjs/swagger';
import { CreatePostBaseDto } from './create-post-base.dto';

export class CreateTextPostDto extends CreatePostBaseDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Useful tips for NestJS beginners',
    minLength: 20,
    maxLength: 50,
  })
  public title!: string;

  @ApiProperty({
    description: 'Post announcement',
    example:
      'In this post we discuss useful patterns and practices for NestJS beginners and beyond.',
    minLength: 50,
    maxLength: 255,
  })
  public announcement!: string;

  @ApiProperty({
    description: 'Post text',
    example:
      'Full publication text goes here and must contain at least one hundred characters to meet the project requirements for text posts.',
    minLength: 100,
    maxLength: 1024,
  })
  public text!: string;
}
