import { ApiPropertyOptional } from '@nestjs/swagger';
import { PostStatus } from '@project/types';

export class UpdatePostDto {
  @ApiPropertyOptional({
    description: 'Post status',
    enum: PostStatus,
    example: PostStatus.Draft,
  })
  public status?: PostStatus;

  @ApiPropertyOptional({
    description: 'Post tags',
    example: ['nestjs', 'backend'],
    isArray: true,
    type: String,
  })
  public tags?: string[];

  @ApiPropertyOptional({
    description: 'Post title',
  })
  public title?: string;

  @ApiPropertyOptional({
    description: 'YouTube video URL',
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
  })
  public photoPath?: string;

  @ApiPropertyOptional({
    description: 'Link URL',
  })
  public link?: string;

  @ApiPropertyOptional({
    description: 'Link description',
  })
  public description?: string;
}
