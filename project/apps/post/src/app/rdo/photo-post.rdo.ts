import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from './post.rdo';

export class PhotoPostRdo extends PostRdo {
  @ApiProperty({
    description: 'Photo file path',
    example: '/uploads/photo.jpg',
  })
  @Expose()
  public photoPath!: string;
}
