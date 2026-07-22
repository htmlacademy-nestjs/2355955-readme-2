import { ApiProperty } from '@nestjs/swagger';
import { CreatePostBaseDto } from './create-post-base.dto';

export class CreateQuotePostDto extends CreatePostBaseDto {
  @ApiProperty({
    description: 'Quote text',
    example: 'The only way to do great work is to love what you do every day.',
    minLength: 20,
    maxLength: 300,
  })
  public quote!: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Steve Jobs',
    minLength: 3,
    maxLength: 50,
  })
  public author!: string;
}
