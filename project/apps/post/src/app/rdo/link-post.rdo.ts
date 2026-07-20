import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostRdo } from './post.rdo';

export class LinkPostRdo extends PostRdo {
  @ApiProperty({
    description: 'Link URL',
    example: 'https://nestjs.com',
  })
  @Expose()
  public link!: string;

  @ApiPropertyOptional({
    description: 'Link description',
    example: 'Official NestJS documentation website',
  })
  @Expose()
  public description?: string;
}
