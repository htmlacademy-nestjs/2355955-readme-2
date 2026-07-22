import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostBaseDto } from './create-post-base.dto';

export class CreateLinkPostDto extends CreatePostBaseDto {
  @ApiProperty({
    description: 'Link URL',
    example: 'https://nestjs.com',
  })
  public link!: string;

  @ApiPropertyOptional({
    description: 'Link description',
    example: 'Official NestJS documentation website',
    maxLength: 300,
  })
  public description?: string;
}
