import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from './post.rdo';

export class QuotePostRdo extends PostRdo {
  @ApiProperty({
    description: 'Quote text',
    example: 'The only way to do great work is to love what you do every day.',
  })
  @Expose()
  public quote!: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Steve Jobs',
  })
  @Expose()
  public author!: string;
}
