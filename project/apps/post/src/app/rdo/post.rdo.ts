import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostStatus } from '@project/types';

export class PostRdo {
  @ApiProperty({
    description: 'The uniq post ID',
    example: '13',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'Post author ID',
    example: '00000000-0000-0000-0000-000000000001',
  })
  @Expose()
  public userId!: string;

  @ApiProperty({
    description: 'Post status',
    enum: PostStatus,
    example: PostStatus.Published,
  })
  @Expose()
  public status!: PostStatus;

  @ApiPropertyOptional({
    description: 'Post tags',
    example: ['nestjs', 'backend'],
    isArray: true,
    type: String,
  })
  @Expose()
  public tags?: string[];

  @ApiProperty({
    description: 'Post creation date',
    example: '2026-07-19T10:00:00.000Z',
  })
  @Expose()
  public createdAt!: string;

  @ApiProperty({
    description: 'Post publication date',
    example: '2026-07-19T12:00:00.000Z',
  })
  @Expose()
  public publishedAt!: string;

  @ApiProperty({
    description: 'Whether the post is a repost',
    example: false,
  })
  @Expose()
  public isRepost!: boolean;

  @ApiPropertyOptional({
    description: 'Original post ID (for reposts)',
    example: '42',
  })
  @Expose()
  public originalPostId?: string;

  @ApiPropertyOptional({
    description: 'Original post author ID (for reposts)',
    example: '00000000-0000-0000-0000-000000000002',
  })
  @Expose()
  public originalPostUserId?: string;
}
