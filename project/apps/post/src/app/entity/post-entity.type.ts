import { VideoPostEntity } from './video-post.entity';
import { TextPostEntity } from './text-post.entity';
import { QuotePostEntity } from './quote-post.entity';
import { PhotoPostEntity } from './photo-post.entity';
import { LinkPostEntity } from './link-post.entity';

export type PostEntity =
  | VideoPostEntity
  | TextPostEntity
  | QuotePostEntity
  | PhotoPostEntity
  | LinkPostEntity;
