import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostBaseDto {
  @ApiPropertyOptional({
    description: 'Post tags',
    example: ['nestjs', 'backend'],
    isArray: true,
    type: String,
  })
  public tags?: string[];
}
