import { ApiProperty } from '@nestjs/swagger';
import { CreatePostBaseDto } from './create-post-base.dto';

export class CreatePhotoPostDto extends CreatePostBaseDto {
  @ApiProperty({
    description: 'Photo file path. Max size 1MB. Allowed formats: jpg, png',
    example: '/uploads/photo.jpg',
  })
  public photoPath!: string;
}
