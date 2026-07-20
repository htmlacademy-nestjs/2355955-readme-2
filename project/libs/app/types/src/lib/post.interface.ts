export enum PostType {
  Video = 'video',
  Text = 'text',
  Quote = 'quote',
  Photo = 'photo',
  Link = 'link',
}

export enum PostStatus {
  Published = 'published',
  Draft = 'draft',
}

interface BasePost {
  id?: string;
  userId: string;
  status: PostStatus;
  tags?: string[];
  createdAt: Date;
  publishedAt: Date;
  isRepost: boolean;
  originalPostId?: string;
  originalPostUserId?: string;
}

export interface VideoPost extends BasePost {
  type: PostType.Video;
  title: string;
  videoUrl: string;
}

export interface TextPost extends BasePost {
  type: PostType.Text;
  title: string;
  announcement: string;
  text: string;
}

export interface QuotePost extends BasePost {
  type: PostType.Quote;
  quote: string;
  author: string;
}

export interface PhotoPost extends BasePost {
  type: PostType.Photo;
  photoPath: string;
}

export interface LinkPost extends BasePost {
  type: PostType.Link;
  link: string;
  description?: string;
}

export type Post = VideoPost | TextPost | QuotePost | PhotoPost | LinkPost;
